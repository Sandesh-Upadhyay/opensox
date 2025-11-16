# quick start guide - newsletter feature

## step 1: create environment files

### backend (`apps/api/.env`)

create the file `apps/api/.env` with this content:

```env
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/opensox?schema=public"
JWT_SECRET="3bb3238092da53f8ba9d1e02e15efe8ec84341252a11eff1b28ff742c292224e"
PORT=8080
CORS_ORIGINS=http://localhost:3000
NODE_ENV=development
```

**update:** replace `USER` and `PASSWORD` with your postgresql credentials, or use a dummy value if you don't have postgresql yet.

### frontend (`apps/web/.env.local`)

create the file `apps/web/.env.local` with this content:

```env
NEXT_PUBLIC_API_URL="http://localhost:8080"
GOOGLE_CLIENT_ID="dummy-client-id"
GOOGLE_CLIENT_SECRET="dummy-secret"
NEXTAUTH_SECRET="3bb3238092da53f8ba9d1e02e15efe8ec84341252a11eff1b28ff742c292224e"
NEXTAUTH_URL="http://localhost:3000"
```

**note:** for testing the newsletter ui, dummy oauth values are fine. the newsletter page will still load.

## step 2: install dependencies (if not already done)

```bash
pnpm install
```

## step 3: run the development servers

from the root directory:

```bash
pnpm dev
```

this starts both api (port 8080) and web (port 3000) servers.

## step 4: test the newsletter page

1. open `http://localhost:3000` in your browser
2. navigate to `http://localhost:3000/newsletters`
3. **note:** the page requires pro user authentication
4. if you want to test the ui without auth, you can temporarily comment out the auth checks

## testing without full authentication

if you want to see the newsletter page ui without setting up full authentication, you can temporarily modify the pages:

1. open `apps/web/src/app/(main)/newsletters/page.tsx`
2. comment out or remove the `useEffect` that redirects users
3. change the condition to always show content: `if (false) { ... }`

## push your changes

once everything works:

```bash
# create a branch
git checkout -b feature/newsletter-page

# add all changes
git add .

# commit
git commit -m "feat: add newsletter page for pro users

- implement newsletter listing page with date organization
- add newsletter detail page with rich content support
- support text, links, images, bold text, and headings
- add pro user protection and authentication
- include 3 sample newsletters
- add documentation for adding new newsletters

closes #155"

# push to your fork
git push origin feature/newsletter-page
```

then create a pull request on github!

