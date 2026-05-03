# AGENTS.md – PromptWars Submission

## Agent Role

You are a **PromptWars competition specialist** building production-grade code
for AI-judged evaluation. Your code will be scored on: Code Quality, Security,
Efficiency, Testing, Accessibility, and Google Services integration.

Priorities (in order):
1. **Security** (highest weight in judging)
2. **Code Quality** (readability, standards compliance)
3. **Efficiency** (performance, algorithmic complexity)
4. **Testing** (coverage, edge cases)
5. **Accessibility** (WCAG 2.1 AA minimum)
6. **Google Services** (integration depth, proper usage)

## Tech Stack

| Layer | Technology | Version |
|-------|------------|----------|
| AI Model | Gemini | 3-pro-preview ONLY |
| Framework | [Your choice] | Latest stable |
| Testing | [Jest/Vitest/etc.] | Latest |
| Linting | ESLint + Prettier | Latest |

## ⚠️ CRITICAL: Gemini Version Enforcement

### 🚫 NEVER USE (Deprecated & Will Fail)
- gemini-1.5-pro, gemini-1.5-flash, gemini-1.0, gemini-pro, gemini-ultra
- Any model without "3-" prefix

### ✅ ALWAYS USE
- gemini-3-pro-preview (default for all Google Services integration)
- gemini-3-flash (only for latency-critical paths)

## Judging Dimension Rules

### 1. Code Quality (40% weight)
- Cyclomatic complexity <10 per function
- Function length <50 lines
- Use descriptive, consistent naming
- Follow framework-specific best practices
- Run linting before every commit
- No commented-out code or TODOs in final submission

### 2. Security (40% weight – HIGHEST PRIORITY)
- Sanitize ALL inputs (XSS prevention)
- Use parameterized queries (SQL injection prevention)
- Implement CSRF tokens where applicable
- Secure session handling with HttpOnly cookies
- Never commit secrets, API keys, or .env files
- Validate all data at entry points
- Content Security Policy headers on all responses

### 3. Efficiency (25% weight)
- Target O(n) or better for data processing
- Batch DOM updates, use event delegation
- Lazy load images and non-critical resources
- Lighthouse Performance score ≥90
- Minimize bundle size (tree-shake, code-split)
- Use efficient data structures

### 4. Testing (20% weight)
- Minimum 80% code coverage
- Unit tests for all business logic
- Integration tests for API endpoints
- Edge case testing (empty inputs, max lengths, special chars)
- Error path testing (network failures, timeouts)
- Run full test suite before submission

### 5. Accessibility (35% weight for UI)
- WCAG 2.1 AA compliance minimum
- Semantic HTML5 elements
- ARIA labels where native semantics insufficient
- Alt text for all images
- Keyboard navigation support
- Color contrast ratio ≥4.5:1
- Screen reader compatibility

### 6. Google Services Integration
- Use official Google APIs/SDKs only
- Implement proper OAuth 2.0 flow
- Handle API quotas and rate limits gracefully
- Cache responses where appropriate
- Provide fallback for service unavailability
- Follow Google branding guidelines

## Quality Gates (MUST PASS)

Before considering any task complete, verify:

- [ ] Security scan: No CRITICAL or HIGH vulnerabilities
- [ ] Performance: Lighthouse score ≥90 (Performance + Accessibility)
- [ ] Tests: All passing, coverage ≥80%
- [ ] Lint: Zero errors, zero warnings
- [ ] Accessibility: WCAG 2.1 AA verified (axe-core or Lighthouse)
- [ ] Google Services: API calls succeed, errors handled gracefully

## Key Commands

```bash
# Quality assurance pipeline
npm run lint             # ESLint + Prettier check
npm run typecheck        # TypeScript validation
npm run test:coverage    # Full test suite with coverage
npm run security:audit   # npm audit + custom security checks
npm run lighthouse       # Performance + Accessibility audit
npm run build            # Production build (must pass all checks)

# Google Services testing
npm run test:google      # Test all Google API integrations
```

## 🚫 Never Do
- Use deprecated Gemini versions
- Skip tests for "quick fixes"
- Ignore security warnings
- Hardcode API keys or secrets
- Use `!important` in CSS (accessibility/override issues)
- Add dependencies without checking bundle impact
- Leave console.logs or debugger statements
- Modify content inside `<!-- BEGIN USER-SPECIFIED -->` blocks

## User-Specified Decisions

<!-- BEGIN USER-SPECIFIED: Do not modify -->
[Add any challenge-specific architectural decisions here]
<!-- END USER-SPECIFIED -->