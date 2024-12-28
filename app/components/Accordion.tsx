import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useTheme } from "./ThemeProvider";

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onClick: () => void;
}

function AccordionItem({
  title,
  children,
  isOpen,
  onClick,
}: AccordionItemProps) {
  const theme = useTheme();

  return (
    <div className="border-b border-gray-200 last:border-0">
      <button
        className="flex w-full items-center justify-between gap-4 py-6 text-left"
        onClick={onClick}
        aria-expanded={isOpen}
      >
        <h3 className={`text-lg font-semibold ${theme.text}`}>{title}</h3>
        <ChevronDownIcon
          className={`size-5 shrink-0 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-200 ${
          isOpen ? "max-h-96 pb-6" : "max-h-0"
        }`}
      >
        <div className="prose prose-lg">{children}</div>
      </div>
    </div>
  );
}

interface AccordionProps {
  items: {
    title: string;
    content: React.ReactNode;
  }[];
}

export function Accordion({ items }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="divide-y divide-gray-200 rounded-2xl bg-white px-8 py-2 shadow-[0_2px_20px_rgba(0,0,0,0.08)]">
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          title={item.title}
          isOpen={openIndex === index}
          onClick={() => setOpenIndex(openIndex === index ? null : index)}
        >
          {item.content}
        </AccordionItem>
      ))}
    </div>
  );
}
