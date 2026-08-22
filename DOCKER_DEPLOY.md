# Docker Deployment Guide for Dokploy

This document explains how to deploy the NishHair application to Dokploy.

## Architecture

Both frontend and backend run under a single domain using nginx as a reverse proxy:

- **Frontend** - React/TypeScript application served via Nitro (Nuxt) on port 3000
- **Backend (Photo Check)** - FastAPI Python service for photo validation on port 8000
- **Nginx** - Reverse proxy on port 80/443 routing requests to appropriate services

**Routing:**
- `/` → Frontend (Nitro)
- `/api/` → Backend API (proxied to `/`)
- `/photo-check` → Backend photo validation endpoint
- `/healthz`, `/readyz` → Backend health endpoints

## Quick Start with Dokploy

### Deploy with Docker Compose

1. **Push your code to a Git repository** (GitHub, GitLab, etc.)

2. **In Dokploy, create a new Docker Compose deployment:**
   - Go to "Deployments" → "Docker Compose"
   - Connect your repository
   - Paste the contents of `docker-compose.yml` into the editor
   - Set the environment variables as shown below
   - Click "Deploy"

3. **Environment Variables needed in Dokploy:**

   | Variable | Value | Description |
   |----------|-------|-------------|
   | `TRYITON_API_KEY` | `your_api_key` | Your TryItOn API key (required for generation) |
   | `ALLOWED_ORIGINS` | `https://yourdomain.com` | Your frontend domain (use `*` for testing) |

4. **Access your application:**
   - Frontend: `https://yourdomain.com`
   - Backend API: Available at `https://yourdomain.com/api/` (proxied by nginx)
   - Photo-check endpoint: `https://yourdomain.com/photo-check`

## Docker Compose Configuration

The `docker-compose.yml` file includes three services:

- **app** - Frontend Nitro server (port 3000)
- **photo-check-backend** - FastAPI backend (port 8000)
- **nginx** - Reverse proxy (ports 80/443)

All services are connected on the `nishhair-network` for inter-service communication.

## Local Development with Docker

To run locally:

```bash
# Build and start services
docker-compose up --build

# Stop services
docker-compose down

# View logs
docker-compose logs -f app
docker-compose logs -f photo-check-backend
docker-compose logs -f nginx
```

## Environment Variables

### Frontend (.env)

```bash
# Velura Photo Check Backend URL
# For local development: http://localhost:8000
# For Docker/Dokploy: /api (nginx reverse proxy)
VITE_PHOTO_CHECK_BACKEND_URL=http://localhost:8000

# Optional: External backend URL (for direct frontend-to-backend calls)
VITE_EXTERNAL_API_URL=
```

### Backend (Docker)

```bash
# CORS allowed origins (comma-separated)
ALLOWED_ORIGINS=*
```

## Testing the Deployment

After deployment, test the endpoints:

```bash
# Frontend health
curl https://yourdomain.com/

# Backend health
curl https://yourdomain.com/healthz
# Expected: {"status": "ok"}

curl https://yourdomain.com/readyz
# Expected: {"status": "ready"}

# Photo check endpoint
curl -F "photo=@some_test_photo.jpg" https://yourdomain.com/photo-check
```

## Troubleshooting

### Build Fails

The Dockerfile fetches model weights during build time. If the build fails:

1. Check network connectivity from your Dokploy server
2. Consider building the image locally and pushing to a registry
3. Or manually download the model files and include them in the repository

### CORS Errors

If you see CORS errors from the frontend:

1. Update `ALLOWED_ORIGINS` to include your frontend domain
2. For multiple domains, separate with commas: `https://example.com,https://www.example.com`

### Nginx Connection Refused

1. Ensure the app and photo-check-backend services are healthy
2. Check that all services are on the same Docker network
3. Verify service names match: `app` and `photo-check-backend`

## Production Checklist

- [ ] Set `ALLOWED_ORIGINS` to your actual frontend domain(s)
- [ ] Configure SSL/TLS certificates in Dokploy
- [ ] Set up monitoring/logs
- [ ] Configure backups
- [ ] Test with real user photos
- [ ] Verify all routing paths work correctly

## Notes

- The backend service may take 60-90 seconds to start due to model loading
- Dokploy's free tier may have cold-start delays
- Consider upgrading to a paid tier for consistent performance
- The frontend and backend now share the same domain, simplifying deployment and CORS configuration
