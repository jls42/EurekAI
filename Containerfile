# =========================================
# Stage 1: Build frontend (Vite + Tailwind)
# =========================================
FROM node:24-slim AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm \
    npm ci --ignore-scripts

COPY . .
RUN npm run build

# =========================================
# Stage 2: Production runtime
# =========================================
FROM node:24-slim

WORKDIR /app

# Install production dependencies + tsx (needed by "npm start" = "tsx server.ts")
# --ignore-scripts: skip husky prepare hook (not needed in container)
# Then rebuild ffmpeg-static to download the ffmpeg binary (skipped by --ignore-scripts)
COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev --ignore-scripts && \
    npm install --no-save tsx && \
    npm rebuild ffmpeg-static

# Copy built frontend from builder stage
COPY --from=builder /app/dist ./dist

# Copy server TypeScript sources (executed directly by tsx)
COPY server.ts config.ts store.ts types.ts prompts.ts profiles.ts ./
COPY routes/ ./routes/
COPY generators/ ./generators/
COPY helpers/ ./helpers/

# Copy public assets
COPY public/ ./public/

# Create non-root user
RUN groupadd -r eurekai && useradd -r -g eurekai -m eurekai

# Create output directory with correct ownership
RUN mkdir -p output && chown eurekai:eurekai output

ENV NODE_ENV=production

USER eurekai

EXPOSE 3000

VOLUME ["/app/output"]

CMD ["npm", "start"]
