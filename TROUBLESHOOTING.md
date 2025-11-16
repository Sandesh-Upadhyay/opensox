# troubleshooting guide

## prisma client error

if you see this error:
```
Error: @prisma/client did not initialize yet. Please run "prisma generate"
```

**solution:**
```bash
cd apps/api
npx prisma generate
cd ../..
pnpm dev
```

## database connection errors

if you see database connection errors and you don't have postgresql set up:

1. you can still test the newsletter ui (it doesn't require database)
2. the newsletter data is stored in code, not in the database
3. for full functionality, you'll need postgresql set up

## port already in use

if port 3000 or 8080 is already in use:

1. kill the process using that port, or
2. change the port in your `.env` files

## other common issues

### dependencies not installed
```bash
pnpm install
```

### environment variables not loaded
make sure `.env` files are in the correct locations:
- `apps/api/.env`
- `apps/web/.env.local`

### newsletter page redirects
the newsletter page requires pro user authentication. if you want to test the ui without auth, see the testing section in `NEXT_STEPS.md`.

