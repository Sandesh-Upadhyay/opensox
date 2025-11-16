# newsletter documentation

this document explains how to add new newsletters to the opensox ai newsletter page.

## overview

newsletters are stored in `src/data/newsletters.ts` as an array of newsletter objects. each newsletter supports rich content including text, headings, links, images, and bold text.

## adding a new newsletter

### step 1: open the newsletters data file

navigate to `src/data/newsletters.ts` and locate the `newsletters` array.

### step 2: create a new newsletter object

add a new object to the `newsletters` array with the following structure:

```typescript
{
  id: "unique-id",
  title: "newsletter title",
  date: "YYYY-MM-DD",
  content: [
    // content items go here
  ]
}
```

### step 3: define the content

the `content` array contains objects that define the newsletter content. each content item has a `type` and `content` field.

#### supported content types

1. **text** - regular paragraph text
   ```typescript
   {
     type: "text",
     content: "your text content here"
   }
   ```

2. **heading** - headings (h1, h2, h3, etc.)
   ```typescript
   {
     type: "heading",
     content: "heading text",
     level: 1 // 1-6, defaults to 2
   }
   ```

3. **bold** - bold text (inline)
   ```typescript
   {
     type: "bold",
     content: "bold text"
   }
   ```

4. **link** - hyperlinks
   ```typescript
   {
     type: "link",
     content: "link text",
     href: "https://example.com"
   }
   ```

5. **image** - images
   ```typescript
   {
     type: "image",
     content: "/path/to/image.jpg", // or full URL
     alt: "image description"
   }
   ```

### step 4: example newsletter

here's a complete example:

```typescript
{
  id: "dec-2025-1",
  title: "monthly update: december 2025",
  date: "2025-12-01",
  content: [
    {
      type: "heading",
      content: "welcome to december!",
      level: 1
    },
    {
      type: "text",
      content: "we're excited to share what we've been working on this month."
    },
    {
      type: "heading",
      content: "new features",
      level: 2
    },
    {
      type: "text",
      content: "we've added several new features including:"
    },
    {
      type: "text",
      content: "• improved search functionality"
    },
    {
      type: "text",
      content: "• enhanced filtering options"
    },
    {
      type: "heading",
      content: "community highlights",
      level: 2
    },
    {
      type: "text",
      content: "we want to thank everyone who contributed this month. your support is "
    },
    {
      type: "bold",
      content: "incredible"
    },
    {
      type: "text",
      content: "!"
    },
    {
      type: "text",
      content: "check out our "
    },
    {
      type: "link",
      content: "github repository",
      href: "https://github.com/apsinghdev/opensox"
    },
    {
      type: "text",
      content: " to see what we're working on."
    }
  ]
}
```

### step 5: save and verify

1. save the file
2. the newsletter will automatically appear on the `/newsletters` page
3. newsletters are automatically organized by month and year
4. the latest newsletters appear first

## content guidelines

- keep all text in **lowercase** (as per project requirements)
- use clear, concise headings
- break up long paragraphs with headings
- use links to reference external resources
- use bold text sparingly for emphasis
- images should be optimized and placed in the `public` folder if local

## date format

always use the format `YYYY-MM-DD` for dates (e.g., `"2025-12-01"`).

## id format

use a descriptive id that includes the month and a number, e.g., `"dec-2025-1"`, `"nov-2025-2"`, etc.

## ordering

newsletters are automatically sorted by date (latest first) within each month/year group. months are also sorted with the latest first.

## testing

after adding a newsletter:

1. navigate to `/newsletters` (as a pro user)
2. verify the newsletter appears in the correct month/year section
3. click on the newsletter to view the full content
4. verify all content types render correctly (headings, links, bold text, etc.)

## notes

- only pro users can access the newsletter page
- newsletters are client-side only (no database required)
- content is defined in code, making it easy to version control
- the newsletter system supports all required formatting: text, links, images, bold, and headings

