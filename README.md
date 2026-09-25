# Playwright-Test-Agent

## Run

```powershell
npm run test:e2e
npm run test:e2e -- --workers=4
npm run test:e2e:headed
```

The suite is configured with `fullyParallel: true`. Every test uses Playwright's isolated `page` fixture and reads credentials from `src/.env`; no storage state or shared cart is reused between tests.

## Structure

- `src/pages`: page objects and user-facing actions
- `src/fixtures`: shared typed Playwright fixtures
- `src/test-data`: test data and `.env` loading
- `tests/ttacart`: scenario specs mapped to the test plan
