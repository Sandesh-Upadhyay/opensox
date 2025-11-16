# testing mode - authentication bypassed

## current status

authentication has been **temporarily disabled** on the newsletter pages for ui testing. this allows you to view the newsletter page without setting up oauth credentials.

## what's changed

the following files have been modified to bypass authentication:
- `apps/web/src/app/(main)/newsletters/page.tsx`
- `apps/web/src/app/(main)/newsletters/[id]/page.tsx`

the authentication checks are commented out with notes indicating they're for testing only.

## how to test

1. make sure the dev server is running: `pnpm dev`
2. open your browser and go to: `http://localhost:3000/newsletters`
3. you should now see the newsletter listing page without needing to log in
4. click on any newsletter to view the full content

## before pushing to github

**important:** you must re-enable authentication before creating your pull request!

to re-enable:
1. uncomment all the authentication code in both newsletter page files
2. remove the "temporarily disabled" comments
3. test that authentication works properly
4. then commit and push

## re-enabling authentication

uncomment the following sections in both files:
- the `useEffect` hook that handles redirects
- the loading state check
- the authentication check before rendering content

make sure to test that:
- unauthenticated users are redirected to login
- authenticated non-pro users are redirected to pricing
- only pro users can see the newsletter content

