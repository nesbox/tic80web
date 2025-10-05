## Brief overview
This rule outlines preferences for testing and verifying code changes, emphasizing alternatives to running development servers for simple modifications.

## Testing approach
- Avoid running 'npm run dev' directly for component verification or testing
- Prefer static analysis and code review over running development servers for simple changes
- Use 'npm run build' selectively when necessary for verification
- Focus on code review and static checks rather than live server testing for minor updates

## Verification methods
- Conduct verification through code inspection and linting
- Use build processes only when structural changes require it
- Prioritize efficiency by minimizing runtime testing for straightforward code modifications
