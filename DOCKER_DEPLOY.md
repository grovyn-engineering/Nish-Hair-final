# Docker Deployment Guide for Dokploy

This document explains how to deploy the NishHair application to Dokploy.

## Architecture

The application consists of two services running in the same Docker Compose stack:

1. **Frontend** - React/TypeScript application served via Nitro (Nuxt) on port 3000
2. **Backend (Photo Check)** - FastAPI Python service for photo validation on port 8000

Both services are connected via a Docker bridge network, allowing the frontend to communicate with the backend using the service name `photo-check-backend`.

## Quick Start with Dokploy

### Deploy with Docker Compose (Recommended)

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

### Option 2: Deploy Services Separately

#### Deploy the Photo Check Backend First

1. Create a new deployment in Dokploy using the `./backend/velura-photo-check` directory
2. Set environment variable:
   - `ALLOWED_ORIGINS` = `*` (or your frontend domain)
3. Note the deployed URL (e.g., `https://photo-check-xxx.dokploy.app`)

#### Deploy the Main Application

1. Create another deployment for the main application
2. Set the environment variable:
   - `VITE_PHOTO_CHECK_BACKEND_URL` = `https://photo-check-xxx.dokploy.app` (use the external URL)
3. Deploy

## Docker Compose Configuration

The `docker-compose.yml` file is already configured with:

- Builds the FastAPI backend from `./backend/velura-photo-check`
- Exposes port 8000
- Includes health checks
- Uses a bridge network for service communication

## Local Development with Docker

To run locally:

```bash
# Build and start services
docker-compose up --build

# Stop services
docker-compose down

# View logs
docker-compose logs -f photo-check-backend
```

## Environment Variables

### Frontend (.env)

```bash
# Velura Photo Check Backend URL
# Use "http://photo-check-backend:8000" for Docker Compose networking
# Use "https://your-external-url" for Dokploy deployments
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

After deployment, test the backend:

```bash
curl https://your-photo-check-url.dokploy.app/healthz
# Expected: {"status": "ok"}

curl https://your-photo-check-url.dokploy.app/readyz
# Expected: {"status": "ready"}
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

### Service Not Reachable

1. Ensure both services are on the same Docker network
2. Check that the service name matches: `http://photo-check-backend:8000`
3. Verify the backend service is healthy: `/readyz` endpoint

## Production Checklist

- [ ] Set `ALLOWED_ORIGINS` to your actual frontend domain(s)
- [ ] Update `VITE_PHOTO_CHECK_BACKEND_URL` to the production URL
- [ ] Configure proper SSL certificates in Dokploy
- [ ] Set up monitoring/logs
- [ ] Configure backups
- [ ] Test with real user photos

## Notes

- The backend service may take 60-90 seconds to start due to model loading
- Dokploy's free tier may have cold-start delays
- Consider upgrading to a paid tier for consistent performance
