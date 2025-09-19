# Deployment Guide

This guide covers deploying the Next.js application to various platforms and environments.

## Overview

This Next.js application can be deployed to multiple platforms including Vercel, Netlify, AWS, and Docker containers. Each platform has its own benefits and configuration requirements.

## Prerequisites

Before deploying, ensure you have:

- Project built successfully (`npm run build`)
- All environment variables configured
- Database and external services set up
- Domain name (if using custom domain)

## Vercel Deployment (Recommended)

Vercel is the creator of Next.js and provides the best integration and performance.

### Automatic Deployment

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "feat: prepare for deployment"
   git push origin main
   ```

2. **Connect to Vercel**:
   - Visit [vercel.com](https://vercel.com)
   - Sign up with GitHub account
   - Import your repository
   - Configure environment variables
   - Deploy automatically

### Manual Deployment

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

### Environment Variables

Configure in Vercel dashboard:

```text
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
DATABASE_URL=your-database-connection-string
API_SECRET_KEY=your-secret-key
```

## Netlify Deployment

### Build Configuration

Create `netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = ".next"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Deployment Steps

1. **Connect Repository**:
   - Sign up at [netlify.com](https://netlify.com)
   - Connect GitHub repository
   - Configure build settings

2. **Build Settings**:
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Node version: `18`

## Docker Deployment

### Dockerfile

Create `Dockerfile`:

```dockerfile
# Use Node.js LTS version
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build the application
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

### Docker Compose

Create `docker-compose.yml`:

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=${DATABASE_URL}
    volumes:
      - ./.env.local:/app/.env.local:ro
    restart: unless-stopped

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
      - ./ssl:/etc/nginx/ssl:ro
    depends_on:
      - app
    restart: unless-stopped
```

### Build and Run

```bash
# Build Docker image
docker build -t next-app .

# Run container
docker run -p 3000:3000 next-app

# Using Docker Compose
docker-compose up -d
```

## AWS Deployment

### AWS Amplify

1. **Connect Repository**:
   - Open AWS Amplify Console
   - Connect GitHub repository
   - Configure build settings

2. **Build Specification**:

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: .next
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
```

### EC2 Deployment

1. **Set up EC2 instance**:
   ```bash
   # Connect to EC2
   ssh -i your-key.pem ubuntu@your-ec2-ip
   
   # Install Node.js
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   
   # Install PM2
   npm install -g pm2
   ```

2. **Deploy Application**:
   ```bash
   # Clone repository
   git clone https://github.com/your-username/next-app-template.git
   cd next-app-template
   
   # Install dependencies
   npm ci
   
   # Build application
   npm run build
   
   # Start with PM2
   pm2 start npm --name "next-app" -- start
   pm2 startup
   pm2 save
   ```

## Environment Configuration

### Production Environment Variables

Create `.env.production`:

```bash
# Application
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://your-domain.com

# Database
DATABASE_URL=your-production-database-url

# Authentication
NEXTAUTH_URL=https://your-domain.com
NEXTAUTH_SECRET=your-nextauth-secret

# External APIs
API_KEY=your-api-key
```

### Environment Variable Security

- Never commit `.env` files to version control
- Use platform-specific environment variable settings
- Rotate secrets regularly
- Use different values for different environments

## Performance Optimization

### Next.js Optimizations

```javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client'],
  },
  images: {
    domains: ['example.com'],
    formats: ['image/webp'],
  },
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
}

module.exports = nextConfig
```

### CDN Configuration

Configure CDN for static assets:

```javascript
// next.config.js
const nextConfig = {
  assetPrefix: process.env.NODE_ENV === 'production' 
    ? 'https://cdn.example.com' 
    : '',
}
```

## Monitoring and Analytics

### Error Monitoring

Integrate error monitoring:

```typescript
// lib/monitoring.ts
import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
})
```

### Performance Monitoring

Add performance monitoring:

```typescript
// lib/analytics.ts
import { Analytics } from '@vercel/analytics/react'

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Analytics />
    </>
  )
}
```

## SSL/HTTPS Configuration

### Let's Encrypt (Free SSL)

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Obtain SSL certificate
sudo certbot --nginx -d your-domain.com

# Auto-renewal
sudo crontab -e
# Add: 0 12 * * * /usr/bin/certbot renew --quiet
```

### Nginx Configuration

```nginx
server {
    listen 80;
    server_name your-domain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name your-domain.com;

    ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;

    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

## Backup and Recovery

### Database Backups

```bash
# PostgreSQL backup
pg_dump $DATABASE_URL > backup-$(date +%Y%m%d).sql

# MongoDB backup
mongodump --uri="$MONGODB_URI" --out=backup-$(date +%Y%m%d)
```

### File Backups

```bash
# Create backup script
#!/bin/bash
tar -czf backup-$(date +%Y%m%d).tar.gz \
  --exclude=node_modules \
  --exclude=.next \
  --exclude=.git \
  .
```

## Rollback Strategy

### Quick Rollback

```bash
# Using PM2
pm2 stop next-app
git checkout previous-stable-commit
npm ci
npm run build
pm2 restart next-app

# Using Docker
docker pull your-image:previous-tag
docker stop current-container
docker run -d your-image:previous-tag
```

## Troubleshooting

### Common Issues

1. **Build Failures**:
   - Check Node.js version compatibility
   - Verify all dependencies are installed
   - Check for TypeScript errors

2. **Environment Variables**:
   - Ensure all required variables are set
   - Check variable naming (NEXT_PUBLIC_ prefix for client-side)

3. **Performance Issues**:
   - Enable gzip compression
   - Optimize images and fonts
   - Use CDN for static assets

4. **SSL Issues**:
   - Verify certificate installation
   - Check DNS configuration
   - Ensure redirect from HTTP to HTTPS

### Health Checks

Create health check endpoint:

```typescript
// app/api/health/route.ts
export async function GET() {
  return Response.json({ status: 'ok', timestamp: new Date().toISOString() })
}
```

### Monitoring Commands

```bash
# Check application status
pm2 status

# View logs
pm2 logs next-app

# Monitor resources
pm2 monit

# Docker logs
docker logs container-name

# System resources
htop
df -h
```

This deployment guide provides comprehensive coverage for deploying your Next.js application across different platforms and environments.
