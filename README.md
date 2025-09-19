# IELTS Writing Assessment Platform

A professional, modern web application built with Next.js 15, React 18, and TypeScript for IELTS Writing assessment and scoring. This platform provides automated evaluation of IELTS Writing tasks with detailed feedback, band score prediction, and comprehensive performance analytics.

## Features

### Core Platform Features

- **Next.js 15.3.1** - React framework with App Router for optimal performance
- **React 18.3.1** - Modern React with concurrent features and server components
- **TypeScript 5.6.3** - Full type safety for robust development
- **Tailwind CSS 4.1.11** - Utility-first CSS framework for responsive design
- **HeroUI Components** - Modern React component library for consistent UI

### IELTS Writing Assessment

- **Automated Scoring** - AI-powered evaluation of IELTS Writing Task 1 & Task 2
- **Band Score Prediction** - Accurate scoring based on official IELTS criteria
- **Detailed Feedback** - Comprehensive analysis of writing performance

### Development Experience

- **Turbopack** - Lightning-fast bundler for development builds
- **ESLint 9.25.1** - Code linting and quality checks
- **Prettier 3.5.3** - Code formatting and style consistency
- **Hot Module Replacement** - Instant updates during development
- **TypeScript Integration** - Full type coverage throughout the application

### Professional Features

- **Real-time Assessment** - Instant feedback on submitted essays
- **Practice Mode** - Unlimited practice with various IELTS topics
- **Export Results** - Download assessment reports in multiple formats
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- **Dark Mode Support** - Built-in theme switching with next-themes 0.4.6
- **Smooth Animations** - Enhanced user experience with Framer Motion 11.18.2

## Quick Start

### Prerequisites

Ensure you have the following installed:

- **Node.js** 18.0.0 or later
- **npm** 8.0.0 or later
- **Git** for version control

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/MinzNhat/ielts-writing-assessment.git
   cd ielts-writing-assessment
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to view the application.

4. **Build for production**

   ```bash
   npm run build
   npm start
   ```

   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## Documentation

Comprehensive documentation is available in the [`docs/`](./docs/) directory:

- **[Project Structure](./docs/project-structure.md)** - Understanding the codebase organization
- **[Development Guide](./docs/development.md)** - Development workflow and best practices
- **[Deployment Guide](./docs/deployment.md)** - How to deploy the application
- **[API Documentation](./docs/api.md)** - API endpoints and usage

## Overview

```text
ielts-writing-assessment/
├── app/                   # Next.js App Router
│   ├── assessment /       # Assessment page
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Landing page
│   └── providers.tsx      # Context providers
├── components/            # Reusable React components
├── config/                # Configuration files
│   ├── site.ts            # Site configuration
│   └── fonts.ts           # Font configuration
├── docs/                  # Project documentation
├── public/                # Static assets
├── styles/                # Global stylesheets
└── types/                 # TypeScript type definitions
```

## Tech Stack

### Frontend

- **[Next.js 15.3.1](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://reactjs.org/)** - UI library with latest features
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first CSS framework

### Development Tools

- **[Turbopack](https://turbo.build/pack)** - Fast bundler for development
- **[ESLint](https://eslint.org/)** - Code linting and quality
- **[Prettier](https://prettier.io/)** - Code formatting

## Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint with auto-fix

## Development Workflow

1. **Development**: Use `npm run dev` for hot reload development
2. **Code Quality**: Run `npm run lint` before committing
3. **Testing**: Build with `npm run build` to ensure no errors
4. **Production**: Deploy with `npm run start` after building

## Environment Variables

Create a `.env.local` file in the root directory:

```bash
# Application Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000

# IELTS Assessment API (if applicable)
IELTS_API_KEY=your_api_key_here
IELTS_API_URL=https://api.ielts-assessment.com

# Database (if applicable)
DATABASE_URL=your_database_connection_string
```

## Feature-Based Architecture

This project follows a **feature-based architecture** for better organization:

### Features Structure

Each feature is self-contained with:

- **Components**: Feature-specific UI components
- **Hooks**: Custom hooks for the feature
- **Types**: TypeScript type definitions
- **Utils**: Feature-specific utilities

## Development Setup

### Code Style

- **Indentation**: Tabs (size 4)
- **Formatting**: Prettier with custom rules
- **Linting**: ESLint with Next.js configuration
- **Type Checking**: Strict TypeScript

### Recommended VSCode Extensions

- Prettier - Code formatter
- ESLint - Code linting
- Tailwind CSS IntelliSense
- TypeScript and JavaScript Language Features

## Contributing

We welcome contributions! Please see our [Contributing Guide](./CONTRIBUTING.md) for details.

### Development Workflow

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Add tests for your changes
5. Ensure all tests pass (`npm test`)
6. Commit your changes (`git commit -m 'Add amazing feature'`)
7. Push to the branch (`git push origin feature/amazing-feature`)
8. Open a Pull Request

### Code Style

- Use TypeScript for all new code
- Follow the existing code style
- Write tests for new features
- Update documentation as needed

## Bug Reports

Found a bug? Please report it using our [bug report template](./.github/ISSUE_TEMPLATE/bug_report.md).

## Feature Requests

Have an idea for a new feature? Submit a [feature request](./.github/ISSUE_TEMPLATE/feature_request.md).

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Secure headers configuration
- Regular dependency updates

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## Support

- **Documentation**: [./docs/](./docs/)
- **Issues**: [GitHub Issues](https://github.com/MinzNhat/ielts-writing-assessment/issues)
- **Discussions**: [GitHub Discussions](https://github.com/MinzNhat/ielts-writing-assessment/discussions)
- **Email**: nhat.dang2004.cv@gmail.com

---

<div align="center">
  <p>Made with care by InternX Team</p>
  <p>
    <a href="https://github.com/MinzNhat/ielts-writing-assessment">Star us on GitHub</a> •
    <a href="https://yourdomain.com">Visit Website</a>
  </p>
</div>
