# Contributing to IELTS Writing Assessment Platform

Thank you for your interest in contributing to the IELTS Writing Assessment Platform! This document provides guidelines and instructions for contributing to our project.

## Development Setup

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 18.0.0 or later)
- **npm** (comes with Node.js)
- **Git**

### Getting Started

1. **Fork the repository**
   
   Click the "Fork" button on the top right of this repository page.

2. **Clone your fork**
   
   ```bash
   git clone https://github.com/your-username/ielts-writing-assessment.git
   cd ielts-writing-assessment
   ```

3. **Add upstream remote**
   
   ```bash
   git remote add upstream https://github.com/MinzNhat/ielts-writing-assessment.git
   ```

4. **Install dependencies**
   
   ```bash
   npm install
   ```

5. **Start development server**
   
   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:3000`.

## Project Structure

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

## Development Guidelines

### Code Style

This project uses the following tools for code quality:

- **ESLint** for linting
- **Prettier** for code formatting
- **TypeScript** for type safety
- **EditorConfig** for consistent editor settings

### Coding Standards

1. **TypeScript**: All new code should be written in TypeScript with proper type definitions
2. **Components**: Use functional components with hooks (React 18.3.1 patterns)
3. **Naming Conventions**:
   - Components: PascalCase (`AssessmentPanel.tsx`)
   - Files: kebab-case (`essay-submission.tsx`)
   - Variables: camelCase (`essayScore`)
   - Constants: UPPER_SNAKE_CASE (`MAX_ESSAY_LENGTH`)
   - Interfaces: PascalCase with 'I' prefix (`IEssayData`)

4. **IELTS-Specific Guidelines**:
   - Follow official IELTS scoring criteria in assessment logic
   - Use standard IELTS terminology (Task 1, Task 2, Band Score, etc.)
   - Implement proper validation for essay submissions
   - Ensure accessibility for diverse user needs

### Project-Specific Considerations

When working on IELTS Writing Assessment features:

1. **Assessment Logic**: Follow official IELTS band descriptors
2. **Data Validation**: Implement robust validation for essay inputs
3. **Performance**: Optimize for handling multiple concurrent assessments
4. **Accessibility**: Ensure the platform works for users with different abilities
5. **Internationalization**: Consider future multi-language support

### Commit Messages

Follow the conventional commit format:

```text
type(scope): description

[optional body]

[optional footer]
```

Types:

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

Examples:

- `feat(assessment): add automated band score calculation`
- `fix(ui): resolve mobile menu toggle issue in navbar`
- `docs(readme): update installation instructions`
- `style(components): apply consistent formatting to essay display`

### Testing

Before submitting a pull request:

1. **Run linter**:

   ```bash
   npm run lint
   ```

2. **Build the project**:

   ```bash
   npm run build
   ```

3. **Test in development**:

   ```bash
   npm run dev
   ```

## Pull Request Process

1. **Create a feature branch**:

   ```bash
   git checkout -b feature/essay-assessment-engine
   ```

2. **Make your changes** following the guidelines above

3. **Test your changes**:

   ```bash
   npm run build
   npm run lint
   ```

4. **Commit your changes**:

   ```bash
   git add .
   git commit -m "feat(assessment): add automated essay scoring system"
   ```

5. **Push to your fork**:

   ```bash
   git push origin feature/essay-assessment-engine
   ```

6. **Create a Pull Request**:
   - Go to the original repository
   - Click "New Pull Request"
   - Select your branch
   - Fill out the PR template

### Pull Request Guidelines

- **Title**: Use a clear, descriptive title
- **Description**: Explain what changes you made and why
- **Testing**: Describe how you tested your changes
- **Screenshots**: Include screenshots for UI changes
- **Breaking Changes**: Clearly mark any breaking changes

## Issue Reporting

When reporting bugs or requesting features related to IELTS assessment:

1. **Search existing issues** first
2. **Use descriptive titles** that clearly indicate the IELTS-related area
3. **Provide detailed information**:
   - Node.js version and npm version
   - Browser version (for frontend issues)
   - Steps to reproduce (include sample essay text if relevant)
   - Expected vs actual behavior
   - IELTS assessment criteria affected (if applicable)

### Bug Report Template

```markdown
**Describe the bug**
A clear and concise description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Submit essay with '...'
3. See error

**Expected behavior**
A clear description of what you expected to happen.

**IELTS Context**
- Which IELTS task type (Task 1/Task 2)
- Assessment criteria affected
- Band score range involved

**Environment:**
- OS: [e.g. Windows 10]
- Browser: [e.g. Chrome 91]
- Node version: [e.g. 18.17.0]
```

### Development Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint with auto-fix

## Getting Help

If you need help:

1. Check the [documentation](./docs/)
2. Search existing issues
3. Create a new issue with the "question" label

## License

By contributing to this project, you agree that your contributions will be licensed under the same license as the project (MIT License).

Thank you for contributing!

## Getting Help

If you need help:

1. Check the [documentation](./docs/)
2. Search existing issues
3. Create a new issue with the "question" label
4. Join our community discussions

## License

By contributing to this project, you agree that your contributions will be licensed under the same license as the project (MIT License).

Thank you for contributing!
