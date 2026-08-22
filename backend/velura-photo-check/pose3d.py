"""
pose3d.py -- thin, production-facing wrapper around the 3DDFA_V2 pose model.

This is the ONLY file your application code should import from. It hides
all the 3DDFA_V2 internals (TDDFA class, BFM model, config loading) behind
one function and a load-once-at-startup pattern.

Design notes:
- No FaceBoxes / Sim3DR / Cython build required -- this trims the original
  cleardusk/3DDFA_V2 repo down to just the pose-relevant files (see
  tddfa_lite/), and expects the CALLER to supply the face bounding box
  (e.g. from the MediaPipe detector validate_photo.py already runs), so we
  don't pull in their face detector or its Cython NMS extension at all.
- CPU only. No GPU/CUDA dependency.
- The model (~14MB weights + BFM config) should be loaded ONCE per process
  at application startup, not per-request -- load takes ~6s, inference is
  ~15ms/image after that. See `get_estimator()` below.

Usage from a web backend (see README.md for a full Flask/FastAPI example):

    from pose3d import get_estimator

    estimator = get_estimator()          # call once, at app startup

    # per request, after you already have a face box (x0, y0, x1, y1) from
    # your own face detector:
    yaw, pitch, roll = estimator.estimate(image_bgr, box)
"""
import os
import sys
import threading

_HERE = os.path.dirname(os.path.abspath(__file__))
_LITE_DIR = os.path.join(_HERE, "tddfa_lite")
if _LITE_DIR not in sys.path:
    sys.path.insert(0, _LITE_DIR)

import yaml  # noqa: E402
from TDDFA import TDDFA  # noqa: E402
from utils.pose import calc_pose  # noqa: E402

_CONFIG_PATH = os.path.join(_LITE_DIR, "configs", "mb1_120x120.yml")

_lock = threading.Lock()
_singleton = None


class PoseEstimator3DDFA:
    def __init__(self, config_path=_CONFIG_PATH):
        cfg = yaml.load(open(config_path), Loader=yaml.SafeLoader)
        # cfg's checkpoint_fp / bfm_fp are relative to tddfa_lite/ by
        # convention in the shipped yml; resolve them against _LITE_DIR so
        # this works regardless of the caller's cwd.
        cfg["checkpoint_fp"] = os.path.join(_LITE_DIR, cfg["checkpoint_fp"])
        cfg["bfm_fp"] = os.path.join(_LITE_DIR, cfg["bfm_fp"])
        self._tddfa = TDDFA(gpu_mode=False, **cfg)

    def estimate(self, image_bgr, box):
        """
        image_bgr: HxWx3 uint8 array (as returned by cv2.imread), full frame.
        box: (x0, y0, x1, y1) pixel coordinates of ONE face, from your own
             face detector (e.g. the MediaPipe box validate_photo.py finds).

        Returns (yaw, pitch, roll) in degrees.

        Sign/scale note: these angles come straight out of 3DDFA_V2's own
        rotation-matrix decomposition and are NOT guaranteed to share sign
        convention with validate_photo.py's _estimate_pose(). If you use
        this as a second opinion / cross-check rather than a replacement,
        compare magnitudes or recalibrate signs first -- see
        compare_pose.py from the calibration run for the exact mapping we
        found (roll and yaw were sign-flipped vs validate_photo.py's
        heuristic; pitch had a systematic bias, which is why
        validate_photo.py's neutral-offset constant was corrected to 0.205).
        """
        x0, y0, x1, y1 = box
        param_lst, _ = self._tddfa(image_bgr, [[x0, y0, x1, y1, 1.0]])
        _, pose = calc_pose(param_lst[0])
        yaw, pitch, roll = pose
        return float(yaw), float(pitch), float(roll)


def get_estimator():
    """Thread-safe lazy singleton -- call this once at app startup (or let
    the first request pay the ~6s load cost, whichever fits your deploy)."""
    global _singleton
    if _singleton is None:
        with _lock:
            if _singleton is None:
                _singleton = PoseEstimator3DDFA()
    return _singleton


if __name__ == "__main__":
    # quick smoke test: python3 pose3d.py <image.jpg> <x0> <y0> <x1> <y1>
    import cv2
    img_path = sys.argv[1]
    box = tuple(float(v) for v in sys.argv[2:6])
    img = cv2.imread(img_path)
    est = get_estimator()
    yaw, pitch, roll = est.estimate(img, box)
    print(f"yaw={yaw:.1f} pitch={pitch:.1f} roll={roll:.1f}")
