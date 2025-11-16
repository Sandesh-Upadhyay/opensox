// newsletter data structure
// each newsletter contains rich content with support for text, links, images, bold text, and headings

export interface NewsletterContent {
  type: "text" | "heading" | "link" | "image" | "bold";
  content: string;
  href?: string; // for links
  alt?: string; // for images
  level?: number; // for headings (1-6)
}

export interface Newsletter {
  id: string;
  title: string;
  date: string; // format: YYYY-MM-DD
  content: NewsletterContent[];
}

export const newsletters: Newsletter[] = [
  {
    id: "nov-2025-1",
    title: "welcome to opensox ai newsletter",
    date: "2025-11-15",
    content: [
      {
        type: "heading",
        content: "welcome to opensox ai!",
        level: 1,
      },
      {
        type: "text",
        content:
          "we're excited to launch our newsletter for pro users. this is where we'll share updates, insights, and stories about building opensox ai.",
      },
      {
        type: "heading",
        content: "what's new",
        level: 2,
      },
      {
        type: "text",
        content:
          "this month, we've been working hard on improving the platform. here are some highlights:",
      },
      {
        type: "text",
        content:
          "• improved search functionality for finding open source projects",
      },
      {
        type: "text",
        content: "• enhanced filtering options for better project discovery",
      },
      {
        type: "text",
        content: "• new dashboard features for pro users",
      },
      {
        type: "heading",
        content: "community spotlight",
        level: 2,
      },
      {
        type: "text",
        content:
          "we want to thank all our contributors who have been helping us build opensox ai. your support means everything to us.",
      },
      {
        type: "link",
        content: "check out our github repository",
        href: "https://github.com/apsinghdev/opensox",
      },
      {
        type: "text",
        content:
          " to see what we're working on and how you can contribute.",
      },
      {
        type: "heading",
        content: "coming soon",
        level: 2,
      },
      {
        type: "text",
        content:
          "we have some exciting features in the pipeline. stay tuned for updates on:",
      },
      {
        type: "bold",
        content: "ai-powered project recommendations",
      },
      {
        type: "text",
        content: " and ",
      },
      {
        type: "bold",
        content: "advanced analytics",
      },
      {
        type: "text",
        content: " for your contributions.",
      },
    ],
  },
  {
    id: "nov-2025-2",
    title: "building in public: lessons learned",
    date: "2025-11-10",
    content: [
      {
        type: "heading",
        content: "building in public: lessons learned",
        level: 1,
      },
      {
        type: "text",
        content:
          "building opensox ai has been an incredible journey. we've learned a lot about building products, engaging with communities, and staying focused on what matters.",
      },
      {
        type: "heading",
        content: "key insights",
        level: 2,
      },
      {
        type: "text",
        content:
          "one of the most important lessons we've learned is the value of ",
      },
      {
        type: "bold",
        content: "iterative development",
      },
      {
        type: "text",
        content:
          ". we started with a simple idea and have been refining it based on user feedback.",
      },
      {
        type: "heading",
        content: "community feedback",
        level: 2,
      },
      {
        type: "text",
        content:
          "your feedback has been invaluable. we've received hundreds of suggestions and feature requests, and we're working through them systematically.",
      },
      {
        type: "text",
        content:
          "if you have ideas or feedback, please don't hesitate to reach out. we're always listening.",
      },
      {
        type: "heading",
        content: "what's next",
        level: 2,
      },
      {
        type: "text",
        content:
          "we're focusing on making opensox ai the best platform for discovering and contributing to open source projects. expect more updates soon!",
      },
    ],
  },
  {
    id: "oct-2025-1",
    title: "launching opensox ai pro",
    date: "2025-10-28",
    content: [
      {
        type: "heading",
        content: "launching opensox ai pro",
        level: 1,
      },
      {
        type: "text",
        content:
          "we're thrilled to announce the launch of opensox ai pro! this is a major milestone for us, and we couldn't have done it without your support.",
      },
      {
        type: "heading",
        content: "what is opensox ai pro?",
        level: 2,
      },
      {
        type: "text",
        content:
          "opensox ai pro is our premium offering that gives you access to:",
      },
      {
        type: "text",
        content: "• exclusive newsletter content (like this one!)",
      },
      {
        type: "text",
        content: "• advanced project filtering and search",
      },
      {
        type: "text",
        content: "• priority support",
      },
      {
        type: "text",
        content: "• early access to new features",
      },
      {
        type: "heading",
        content: "why we built this",
        level: 2,
      },
      {
        type: "text",
        content:
          "building and maintaining opensox ai requires significant resources. by offering a pro tier, we can:",
      },
      {
        type: "text",
        content:
          "• continue improving the platform for everyone",
      },
      {
        type: "text",
        content: "• provide better support to our users",
      },
      {
        type: "text",
        content: "• invest in new features and capabilities",
      },
      {
        type: "heading",
        content: "thank you",
        level: 2,
      },
      {
        type: "text",
        content:
          "to all our pro users: thank you for believing in opensox ai and supporting our mission. we're committed to making this worth your investment.",
      },
      {
        type: "text",
        content:
          "if you're not a pro user yet and want to learn more, ",
      },
      {
        type: "link",
        content: "check out our pricing page",
        href: "/pricing",
      },
      {
        type: "text",
        content: ".",
      },
    ],
  },
];

// helper function to get newsletters grouped by month and year
export function getNewslettersByDate() {
  const grouped: Record<string, Newsletter[]> = {};

  newsletters.forEach((newsletter) => {
    const date = new Date(newsletter.date);
    const year = date.getFullYear();
    const month = date.toLocaleString("default", { month: "long" });
    const key = `${year}-${month}`;

    if (!grouped[key]) {
      grouped[key] = [];
    }
    grouped[key].push(newsletter);
  });

  // sort newsletters within each group by date (latest first)
  Object.keys(grouped).forEach((key) => {
    grouped[key].sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  });

  // sort groups by date (latest first)
  const sortedKeys = Object.keys(grouped).sort((a, b) => {
    const [yearA, monthA] = a.split("-");
    const [yearB, monthB] = b.split("-");
    const dateA = new Date(`${monthA} 1, ${yearA}`);
    const dateB = new Date(`${monthB} 1, ${yearB}`);
    return dateB.getTime() - dateA.getTime();
  });

  return { grouped, sortedKeys };
}

// helper function to get a single newsletter by id
export function getNewsletterById(id: string): Newsletter | undefined {
  return newsletters.find((newsletter) => newsletter.id === id);
}

