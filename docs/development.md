# Development Guide

This guide covers everything you need to know to develop and contribute to the IELTS Writing Assessment Platform.

## Prerequisites

Before starting development, ensure you have:

- **Node.js**: Version 18.0.0 or later
- **npm**: Version 8.0.0 or later (comes with Node.js)
- **Git**: For version control

## Initial Setup

### 1. Clone the Repository

```bash
git clone https://github.com/MinzNhat/ielts-writing-assessment.git
cd ielts-writing-assessment
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

## Development Scripts

### Available Commands

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint with auto-fix

### Development Server Features

The development server includes:

- **Hot Module Replacement (HMR)**: Instant updates without page refresh
- **Turbopack**: Fast bundler for improved development experience
- **TypeScript Checking**: Real-time type checking
- **ESLint Integration**: Code quality checks

## Tech Stack

### Frontend

- **Next.js 15.3.1** - React framework with App Router
- **React 18.3.1** - UI library with modern features
- **TypeScript 5.6.3** - Type-safe JavaScript
- **Tailwind CSS 4.1.11** - Utility-first CSS framework
- **HeroUI Components** - Modern React component library

### Development Tools

- **Turbopack** - Fast bundler for development
- **ESLint 9.25.1** - Code linting and quality
- **Prettier 3.5.3** - Code formatting
- **Framer Motion 11.18.2** - Smooth animations
- **next-themes 0.4.6** - Dark mode support

```typescript
// Good - Properly typed component
interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary'
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary'
}) => {
  return (
    <button className={`btn btn-${variant}`} onClick={onClick}>
      {children}
    </button>
  )
}
```

### Component Structure

Follow this structure for React components:

```typescript
// 1. Imports
import React from 'react'
import { Button } from '@heroui/button'

// 2. Types/Interfaces
interface ComponentProps {
  title: string
  description?: string
}

// 3. Component
export const MyComponent: React.FC<ComponentProps> = ({
  title,
  description
}) => {
  // 4. Hooks and state
  const [isOpen, setIsOpen] = React.useState(false)

  // 5. Event handlers
  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  // 6. Render
  return (
    <div>
      <h1>{title}</h1>
      {description && <p>{description}</p>}
      <Button onClick={handleToggle}>
        {isOpen ? 'Close' : 'Open'}
      </Button>
    </div>
  )
}
```

### Styling Guidelines

#### Tailwind CSS

Use Tailwind CSS for styling with these guidelines:

```typescript
// Good - Utility classes
<div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">
  <h2 className="text-xl font-semibold text-gray-900">Title</h2>
  <Button className="ml-4">Action</Button>
</div>

// Good - Responsive design
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Content */}
</div>
```

#### Custom CSS

For complex styles, use CSS modules or styled-components:

```css
/* styles/component.module.css */
.container {
  @apply flex items-center justify-between;
  background: linear-gradient(to right, #667eea 0%, #764ba2 100%);
}
```

## File Organization

### Import Order

Organize imports in this order:

```typescript
// 1. React and Next.js
import React from 'react'
import { NextPage } from 'next'
import Link from 'next/link'

// 2. Third-party libraries
import { Button } from '@heroui/button'
import { motion } from 'framer-motion'

// 3. Internal components
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'

// 4. Internal utilities and configs
import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'

// 5. Type imports
import type { Metadata } from 'next'
import type { ComponentProps } from '@/types'
```

### Path Mapping

Use the configured path aliases:

```typescript
// Good - Use path aliases
import { Button } from '@/components/ui/button'
import { siteConfig } from '@/config/site'

// Avoid - Relative paths
import { Button } from '../../../components/ui/button'
```

## Testing Guidelines

### Component Testing

Write tests for components using the testing library:

```typescript
// __tests__/Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from '@/components/Button'

describe('Button', () => {
  it('renders button with text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    
    fireEvent.click(screen.getByText('Click me'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
```

## Performance Optimization

### Image Optimization

Use Next.js Image component for optimized images:

```typescript
import Image from 'next/image'

export const Hero = () => (
  <Image
    src="/hero-image.jpg"
    alt="Hero image"
    width={800}
    height={600}
    priority // For above-the-fold images
    placeholder="blur"
    blurDataURL="data:image/jpeg;base64,..."
  />
)
```

### Code Splitting

Use dynamic imports for code splitting:

```typescript
import dynamic from 'next/dynamic'

const DynamicComponent = dynamic(
  () => import('@/components/HeavyComponent'),
  {
    loading: () => <div>Loading...</div>,
    ssr: false // Disable SSR if needed
  }
)
```

## Debugging

### Development Tools

1. **React Developer Tools**: Browser extension for React debugging
2. **Next.js DevTools**: Built-in development features
3. **TypeScript Errors**: Check VS Code problems panel
4. **Console Logging**: Use `console.log` sparingly

### Common Issues

#### Build Errors

```bash
# Check for TypeScript errors
npx tsc --noEmit

# Check for ESLint errors
npm run lint

# Clear Next.js cache
rm -rf .next
```

#### Runtime Errors

- Check browser console for JavaScript errors
- Verify API endpoints are accessible
- Check network tab for failed requests

## Git Workflow

### Branch Naming

Use descriptive branch names:

```bash
# Features
git checkout -b feature/user-authentication
git checkout -b feature/payment-integration

# Bug fixes
git checkout -b fix/navbar-mobile-menu
git checkout -b fix/api-error-handling

# Documentation
git checkout -b docs/update-readme
```

### Commit Messages

Follow conventional commit format:

```bash
git commit -m "feat(auth): add user login functionality"
git commit -m "fix(navbar): resolve mobile menu toggle issue"
git commit -m "docs(readme): update installation instructions"
```

## Troubleshooting

### Common Problems

1. **Port 3000 already in use**:
   ```bash
   npx kill-port 3000
   # or use different port
   npm run dev -- -p 3001
   ```

2. **Module not found errors**:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **TypeScript errors**:
   - Check `tsconfig.json` configuration
   - Verify import paths
   - Install missing type definitions

4. **Styling issues**:
   - Check Tailwind CSS configuration
   - Verify class names are correct
   - Clear browser cache

### Getting Help

- Check the [documentation](./README.md)
- Search existing [issues](https://github.com/heroui-inc/next-app-template/issues)
- Create a new issue with detailed information
- Join community discussions

## Best Practices

1. **Always use TypeScript**: Type everything properly
2. **Write meaningful commit messages**: Follow conventional commits
3. **Test your changes**: Ensure functionality works as expected
4. **Keep components small**: Single responsibility principle
5. **Use semantic HTML**: Proper accessibility
6. **Optimize performance**: Images, code splitting, lazy loading
7. **Follow naming conventions**: Consistent naming across the project
8. **Document complex logic**: Add comments for complex algorithms
