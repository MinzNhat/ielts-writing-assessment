# Project Structure

This document outlines the structure and organization of the IELTS Writing Assessment Platform project.

## Overview

The project follows Next.js 15 app directory structure with TypeScript and modern tooling for a professional development experience.

## Directory Structure

```text
ielts-writing-assessment/
├── app/                    # Next.js App Router
│   ├── about/             # About page
│   ├── blog/              # Blog section
│   ├── docs/              # Documentation pages
│   ├── pricing/           # Pricing information
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   └── providers.tsx      # Context providers
├── components/            # Reusable React components
│   ├── navbar.tsx         # Navigation component
│   ├── theme-switch.tsx   # Dark mode toggle
│   └── icons.tsx          # Icon components
├── config/                # Configuration files
│   ├── site.ts            # Site configuration
│   └── fonts.ts           # Font configuration
├── docs/                  # Project documentation
├── public/                # Static assets
├── styles/                # Global stylesheets
└── types/                 # TypeScript type definitions
```

## Key Directories

### `/app` - Next.js App Router

The main application directory using Next.js 15 App Router. Each subdirectory represents a route with its own layout and page components.

- **layout.tsx**: Defines the layout for a route segment
- **page.tsx**: Defines the UI for a route
- **error.tsx**: Error boundary for the route segment

### `/components` - Reusable Components

Contains all reusable React components used throughout the application.

- Follow PascalCase naming convention
- Include TypeScript interfaces for props
- Use functional components with hooks

### `/config` - Configuration Files

Application configuration files for fonts, site settings, and other configurations.

### `/docs` - Documentation

Project documentation in Markdown format.

### `/public` - Static Assets

Static files served directly by Next.js. Images, icons, and other assets.

### `/styles` - Stylesheets

Global CSS files and style definitions.

### `/types` - Type Definitions

TypeScript type definitions shared across the application.

## File Naming Conventions

- **Components**: PascalCase (`MyComponent.tsx`)
- **Pages/Layouts**: kebab-case (`my-page.tsx`)
- **Utilities**: camelCase (`myUtility.ts`)
- **Constants**: UPPER_SNAKE_CASE (`MY_CONSTANT.ts`)

## Import Structure

Follow this import order:

1. React and Next.js imports
2. Third-party libraries
3. Internal components
4. Internal utilities and configs
5. Type imports (using `import type`)

```typescript
import React from 'react'
import { NextPage } from 'next'
import { Button } from '@heroui/button'

import { Navbar } from '@/components/navbar'
import { siteConfig } from '@/config/site'

import type { ComponentProps } from '@/types'
```

## Code Organization Best Practices

1. **Single Responsibility**: Each component/function should have one clear purpose
2. **Consistent Naming**: Follow established naming conventions
3. **Type Safety**: Use TypeScript for all code
4. **Component Composition**: Prefer composition over inheritance
5. **Separation of Concerns**: Keep logic, styling, and markup organized

## Configuration Files

### `next.config.js`

Next.js configuration including experimental features and build settings.

### `tailwind.config.js`

Tailwind CSS configuration with custom theme, plugins, and content paths.

### `tsconfig.json`

TypeScript configuration with path mapping and compiler options.

### `eslint.config.mjs`

ESLint configuration with rules for code quality and consistency.

## Development Tools

- **TypeScript**: Type safety and better developer experience
- **ESLint**: Code linting and formatting
- **Prettier**: Code formatting
- **Tailwind CSS**: Utility-first CSS framework
- **HeroUI**: React component library
- **Next.js**: React framework with app router
