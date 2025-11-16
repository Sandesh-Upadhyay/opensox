"use client";

import { NewsletterContent as NewsletterContentType } from "@/data/newsletters";

interface NewsletterContentProps {
  content: NewsletterContentType[];
}

export default function NewsletterContent({
  content,
}: NewsletterContentProps) {
  // group inline elements (text, bold, link) into paragraphs
  const renderContent = () => {
    const elements: JSX.Element[] = [];
    let currentParagraph: NewsletterContentType[] = [];
    let paragraphKey = 0;

    const flushParagraph = () => {
      if (currentParagraph.length > 0) {
        elements.push(
          <p key={`para-${paragraphKey}`} className="text-gray-300 mb-4 leading-relaxed">
            {currentParagraph.map((item, idx) => {
              switch (item.type) {
                case "bold":
                  return (
                    <strong
                      key={idx}
                      className="font-bold text-white"
                    >
                      {item.content}
                    </strong>
                  );
                case "link":
                  return (
                    <a
                      key={idx}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#9455f4] hover:text-white underline transition-colors"
                    >
                      {item.content}
                    </a>
                  );
                case "text":
                default:
                  return <span key={idx}>{item.content}</span>;
              }
            })}
          </p>
        );
        currentParagraph = [];
        paragraphKey++;
      }
    };

    content.forEach((item, index) => {
      switch (item.type) {
        case "heading":
          flushParagraph();
          const HeadingTag = `h${item.level || 2}` as keyof JSX.IntrinsicElements;
          elements.push(
            <HeadingTag
              key={index}
              className={`font-bold text-white mt-8 mb-4 ${
                item.level === 1
                  ? "text-3xl"
                  : item.level === 2
                  ? "text-2xl"
                  : item.level === 3
                  ? "text-xl"
                  : "text-lg"
              }`}
            >
              {item.content}
            </HeadingTag>
          );
          break;

        case "image":
          flushParagraph();
          elements.push(
            <div key={index} className="my-6">
              <img
                src={item.content}
                alt={item.alt || ""}
                className="rounded-lg w-full h-auto"
              />
            </div>
          );
          break;

        case "text":
        case "bold":
        case "link":
          currentParagraph.push(item);
          break;
      }
    });

    flushParagraph();
    return elements;
  };

  return (
    <div className="prose prose-invert max-w-none">
      {renderContent()}
    </div>
  );
}

