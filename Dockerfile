# ==========================================
# 1. Builder Stage
# ==========================================
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package management files
COPY package*.json bun.lock* ./

# Install all dependencies (including devDependencies required for build)
RUN npm ci || npm install

# Copy application source files
COPY . .

# Set environment variables for production build
ENV NODE_ENV=production
ENV NITRO_PRESET=node-server

# Build TanStack Start & Nitro production server
RUN npm run build

# ==========================================
# 2. Production Runner Stage
# ==========================================
FROM node:20-alpine AS runner

WORKDIR /app

# Set production environment
ENV NODE_ENV=production
ENV PORT=3000
ENV HOST=0.0.0.0

# Copy output build directory from builder stage
COPY --from=builder /app/.output ./.output
COPY --from=builder /app/package*.json ./

# Expose server port
EXPOSE 3000

# Health check endpoint
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://127.0.0.1:3000/ || exit 1

# Start Nitro Node.js server
CMD ["node", ".output/server/index.mjs"]
