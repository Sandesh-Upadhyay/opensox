# setup instructions for newsletter feature

follow these steps to run the application locally and test the newsletter page.

## step 1: install dependencies

from the root directory (`opensox`):

```bash
pnpm install
```

## step 2: create backend environment file

create `apps/api/.env` with the following content:

```env
# required
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/opensox?schema=public"
JWT_SECRET="replace-with-a-strong-random-secret"

# optional (good defaults shown)
PORT=8080
CORS_ORIGINS=http://localhost:3000
NODE_ENV=development

# optional but needed for github queries to work
# generate a classic token with "public_repo" access at https://github.com/settings/tokens
GITHUB_PERSONAL_ACCESS_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

**important notes:**
- replace `USER` and `PASSWORD` with your postgresql credentials
- generate `JWT_SECRET` using: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
- if you don't have postgresql, you can skip database setup for now (newsletter page works without it)

## step 3: create frontend environment file

create `apps/web/.env.local` with the following content:

```env
# required
NEXT_PUBLIC_API_URL="http://localhost:8080"
GOOGLE_CLIENT_ID="your-google-oauth-client-id"
GOOGLE_CLIENT_SECRET="your-google-oauth-client-secret"
NEXTAUTH_SECRET="replace-with-a-strong-random-secret"

# recommended for production (optional for local dev)
NEXTAUTH_URL="http://localhost:3000"
```

**important notes:**
- for testing the newsletter page, you can use dummy values for google oauth (the page will still load)
- generate `NEXTAUTH_SECRET` using: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`

## step 4: database setup (optional for newsletter testing)

if you have postgresql installed:

```bash
cd apps/api
npx prisma generate
npx prisma migrate dev
```

if you don't have postgresql, you can still test the newsletter page ui (it doesn't require database).

## step 5: run the development servers

### option a: run both from root (recommended)

from the root directory:

```bash
pnpm dev
```

this will start both api and web servers.

### option b: run separately

**terminal 1 - api server:**
```bash
cd apps/api
pnpm dev
```

**terminal 2 - web server:**
```bash
cd apps/web
pnpm dev
```

## step 6: test the newsletter page

1. open `http://localhost:3000` in your browser
2. the newsletter page is at `http://localhost:3000/newsletters`
3. note: you need to be logged in as a pro user to access it
4. if you're not logged in, you'll be redirected to login
5. if you're logged in but not a pro user, you'll be redirected to pricing

## quick test without full setup

if you just want to see the newsletter page ui without full authentication:

1. you can temporarily comment out the auth checks in the newsletter pages
2. or you can test the components directly

## troubleshooting

### pnpm not found
```bash
npm install -g pnpm@10.11.0
```

### port already in use
change the port in your `.env` files or kill the process using that port.

### database connection errors
if you don't have postgresql set up, you can still test the newsletter ui. the newsletter data is stored in code, not in the database.

### newsletter page redirects
the newsletter page requires pro user authentication. if you want to test without auth, you can temporarily modify the pages to skip the auth check.

