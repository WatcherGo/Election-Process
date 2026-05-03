# PromptWars Boilerplate

A production-grade boilerplate for PromptWars competition submissions with strict quality gates and security enforcement.

## Quick Start

```bash
npm install && npm run judge-check
```

This runs the complete quality assurance pipeline to ensure your code meets all judging criteria.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint checks
- `npm run typecheck` - TypeScript validation
- `npm run test` - Run test suite
- `npm run test:coverage` - Run tests with coverage (80% threshold)
- `npm run security:audit` - Security vulnerability scan
- `npm run judge-check` - Full quality gates check (lint + typecheck + test + security)

## Key Features

✅ **Security First** - Input sanitization, CSRF protection, secure headers  
✅ **Code Quality** - ESLint + TypeScript with strict rules  
✅ **Testing** - Vitest with 80% coverage requirement  
✅ **Accessibility** - WCAG 2.1 AA compliance ready  
✅ **Efficiency** - Optimized for performance (Lighthouse ≥90)  
✅ **Google Services** - Gemini 3-pro-preview integration

## Tech Stack

- **Framework**: React 19
- **Build Tool**: Vite 6
- **Type Safety**: TypeScript 5.6
- **Linting**: ESLint 9 + TypeScript ESLint
- **Testing**: Vitest 2 with Coverage
- **AI Model**: Gemini 3-pro-preview (see GEMINI.md)

## Quality Gates

All submissions must pass:
- ✅ Zero ESLint errors/warnings
- ✅ TypeScript strict mode
- ✅ 80% test coverage minimum
- ✅ No security vulnerabilities (audit-level: moderate)
- ✅ WCAG 2.1 AA compliance

## Documentation

- **AGENTS.md** - Detailed judging criteria and requirements
- **GEMINI.md** - Gemini model enforcement rules

## Security Best Practices

Never commit:
- API keys or secrets (use environment variables)
- .env files
- Hardcoded credentials

Always:
- Sanitize user inputs
- Use parameterized queries
- Implement CSRF tokens
- Handle errors gracefully
- Follow Content Security Policy headers

## License

MIT