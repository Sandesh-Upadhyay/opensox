# next steps - run and push your newsletter feature

## ✅ what's done

- environment files created (`apps/api/.env` and `apps/web/.env.local`)
- dependencies already installed
- newsletter feature code is ready

## 🚀 how to run

### step 1: update database url (if you have postgresql)

if you have postgresql installed, edit `apps/api/.env` and update:
```
DATABASE_URL="postgresql://YOUR_USER:YOUR_PASSWORD@localhost:5432/opensox?schema=public"
```

if you don't have postgresql, you can still test the newsletter ui (it doesn't require database).

### step 2: run the development servers

from the root directory (`opensox`):

```bash
pnpm dev
```

this will start:
- api server on `http://localhost:8080`
- web server on `http://localhost:3000`

### step 3: test the newsletter page

1. open `http://localhost:3000` in your browser
2. navigate to `http://localhost:3000/newsletters`
3. **note:** the page requires pro user authentication
4. if you're not logged in, you'll be redirected to login
5. if you're logged in but not a pro user, you'll be redirected to pricing

### testing without authentication (optional)

if you want to see the ui without full auth setup, you can temporarily modify:

`apps/web/src/app/(main)/newsletters/page.tsx`

comment out lines 17-35 (the useEffect that redirects):

```typescript
// temporarily comment this out for ui testing
// useEffect(() => {
//   ...
// }, [status, isPaidUser, isSubscriptionLoading, router]);
```

and change line 50 to:
```typescript
if (false) { // temporarily always show content
```

remember to revert this before pushing!

## 📤 how to push your changes

### step 1: check your changes

```bash
git status
```

you should see:
- new newsletter files
- documentation files
- modified pnpm-lock.yaml

### step 2: create a feature branch

```bash
git checkout -b feature/newsletter-page
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

or add everything:
```bash
git add .
```

**important:** don't commit the `.env` files (they're in .gitignore)

### step 4: commit

```bash
git commit -m "feat: add newsletter page for pro users

- implement newsletter listing page with date organization
- add newsletter detail page with rich content support
- support text, links, images, bold text, and headings
- add pro user protection and authentication
- include 3 sample newsletters
- add documentation for adding new newsletters

closes #155"
```

### step 5: push to your fork

if you haven't forked yet:
1. go to https://github.com/apsinghdev/opensox
2. click "fork" button
3. add your fork as remote:
   ```bash
   git remote add fork https://github.com/YOUR_USERNAME/opensox.git
   git push fork feature/newsletter-page
   ```

if you already have a fork:
```bash
git push origin feature/newsletter-page
```

### step 6: create pull request

1. go to https://github.com/apsinghdev/opensox/pulls
2. click "new pull request"
3. select your branch `feature/newsletter-page`
4. fill in the pr description (use content from `PR_DESCRIPTION.md`)
5. mention "closes #155" in the description
6. submit the pr

## 📝 pr requirements checklist

- [x] newsletter page implemented
- [x] date organization (month/year)
- [x] rich content support (text, links, images, bold, headings)
- [x] pro user protection
- [x] 3 sample newsletters included
- [x] documentation on how to add newsletters
- [ ] screen recording (you'll need to create this)
- [ ] pr description explaining approach

## 🎥 creating screen recording

for the pr submission, you'll need a screen recording showing:
1. navigating to the newsletter page
2. viewing the newsletter listing
3. clicking on a newsletter
4. viewing the full newsletter content
5. showing the date organization

you can use:
- windows: built-in screen recorder (win + g)
- or any screen recording tool

## 💡 tips

- test everything before pushing
- make sure there are no console errors
- verify the newsletter page works with pro user account
- keep the code clean and follow the lowercase convention
- document any issues or questions in the pr

good luck! 🚀

