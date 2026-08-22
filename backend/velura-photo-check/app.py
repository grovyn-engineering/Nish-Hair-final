"""
Minimal HTTP API wrapping validate_full.validate() -- this is what your
live website calls after a user uploads a photo, before it goes into the
hair try-on pipeline.

Run locally:
    uvicorn app:app --host 0.0.0.0 --port 8000

Then:
    curl -F "photo=@some_test_photo.jpg" http://localhost:8000/photo-check
"""
import os
import tempfile

from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from validate_full import validate, get_validator

app = FastAPI(title="Velura photo pre-check")

# CORS: your static/frontend site (a different origin than this API) needs
# this to be allowed to call it from the browser. Lock ALLOWED_ORIGINS down
# to your real domain(s) before going live -- "*" is fine for local testing
# only.
ALLOWED_ORIGINS = os.environ.get("ALLOWED_ORIGINS", "*").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_methods=["POST"],
    allow_headers=["*"],
)


@app.on_event("startup")
def _warm_models():
    # Pay the ~6s model-load cost once, at boot, not on the first user's
    # request.
    get_validator()


@app.get("/healthz")
def healthz():
    """Hosting platforms poll this to know the service is alive. Returning
    200 here does NOT mean the models are loaded yet on the very first
    request after boot -- see /readyz."""
    return {"status": "ok"}


@app.get("/readyz")
def readyz():
    """Returns 200 only once both models are actually loaded. Point your
    platform's readiness check (if it supports one) at this instead of
    /healthz if you want to avoid routing traffic before startup finishes."""
    get_validator()
    return {"status": "ready"}


@app.post("/photo-check")
async def photo_check(photo: UploadFile = File(...)):
    suffix = os.path.splitext(photo.filename or "")[1] or ".jpg"
    fd, tmp_path = tempfile.mkstemp(suffix=suffix)
    try:
        with os.fdopen(fd, "wb") as f:
            f.write(await photo.read())

        result = validate(tmp_path)
    finally:
        os.remove(tmp_path)

    if not result["passed"]:
        return JSONResponse(
            status_code=400,
            content={
                "ok": False,
                "failures": [f["code"] for f in result["failures"]],
                "reasons": [f["message"] for f in result["failures"]],
            },
        )
    return {"ok": True}
