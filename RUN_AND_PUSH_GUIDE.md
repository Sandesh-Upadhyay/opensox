# how to run and push the newsletter feature

## running the application locally

### prerequisites

1. **node.js** (version >= 18)
2. **pnpm** (package manager - version 10.11.0)
3. **postgresql** database (for backend)
4. environment variables set up

### step 1: install dependencies

from the root directory (`opensox`):

```bash
pnpm install
```

### step 2: set up environment variables

#### backend (`apps/api/.env`)

create or update `apps/api/.env`:

```bash
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/opensox?schema=public"
JWT_SECRET="your-jwt-secret-here"
PORT=8080
CORS_ORIGINS=http://localhost:3000
NODE_ENV=development
```

#### frontend (`apps/web/.env.local`)

create or update `apps/web/.env.local`:

```bash
NEXT_PUBLIC_API_URL="http://localhost:8080"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
NEXTAUTH_SECRET="your-nextauth-secret"
NEXTAUTH_URL="http://localhost:3000"
```

### step 3: set up database

```bash
cd apps/api
npx prisma generate
npx prisma migrate dev
```

### step 4: run the development servers

#### option a: run both from root (recommended)

from the root directory:

```bash
pnpm dev
```

this will start both the api and web servers.

#### option b: run separately

**terminal 1 - api server:**
```bash
cd apps/api
pnpm dev
```
api will run on `http://localhost:8080`

**terminal 2 - web server:**
```bash
cd apps/web
pnpm dev
```
web will run on `http://localhost:3000`

### step 5: test the newsletter page

1. open `http://localhost:3000` in your browser
2. log in with a pro user account
3. navigate to `http://localhost:3000/newsletters`
4. you should see the newsletter listing page
5. click on any newsletter to view the full content

## pushing your changes

### step 1: check your changes

```bash
git status
```

you should see:
- new files: newsletter components, pages, and data
- modified: pnpm-lock.yaml

### step 2: create a new branch (recommended)

```bash
git checkout -b feature/newsletter-page
```

or if you want to use a different branch name:

```bash
git checkout -b newsletter-ui-implementation
```

### step 3: stage your changes

```bash
git add apps/web/src/app/(main)/newsletters/
git add apps/web/src/components/newsletters/
git add apps/web/src/data/newsletters.ts
git add apps/web/NEWSLETTER_DOCUMENTATION.md
git add apps/web/PR_DESCRIPTION.md
git add pnpm-lock.yaml
```

or add all changes at once:

```bash
git add .
```

### step 4: commit your changes

```bash
git commit -m "feat: add newsletter page for pro users

- implement newsletter listing page with date organization
- add newsletter detail page with rich content support
- support text, links, images, bold text, and headings
- add pro user protection and authentication
- include 3 sample newsletters
- add documentation for adding new newsletters"
```

### step 5: push to your fork

if you haven't forked the repo yet:

1. go to https://github.com/apsinghdev/opensox
2. click "fork" button
3. add your fork as a remote:

```bash
git remote add fork https://github.com/YOUR_USERNAME/opensox.git
```

then push:

```bash
git push fork feature/newsletter-page
```

or if you're pushing to your existing fork:

```bash
git push origin feature/newsletter-page
```

### step 6: create a pull request

1. go to https://github.com/apsinghdev/opensox
2. click "pull requests" tab
3. click "new pull request"
4. select your branch
5. fill in the pr description (you can use content from `PR_DESCRIPTION.md`)
6. mention issue #155 in the description
7. submit the pr

## quick commands summary

```bash
# install dependencies
pnpm install

# run dev servers
pnpm dev

# create branch
git checkout -b feature/newsletter-page

# add changes
git add .

# commit
git commit -m "feat: add newsletter page for pro users"

# push
git push origin feature/newsletter-page
```

## troubleshooting

### if pnpm is not installed:

```bash
npm install -g pnpm@10.11.0
```

### if you get database errors:

make sure postgresql is running and your `DATABASE_URL` is correct.

### if you get port already in use:

change the port in your environment variables or kill the process using that port.

### if newsletter page doesn't load:

1. make sure you're logged in as a pro user
2. check browser console for errors
3. verify api server is running
4. check that subscription status is being fetched correctly

