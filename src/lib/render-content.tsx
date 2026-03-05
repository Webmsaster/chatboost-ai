import React from "react";

export function renderContent(content: string[]): React.ReactNode[] {
  return content.map((block, i) => {
    // ## Heading 2
    if (block.startsWith("## ")) {
      return (
        <h2
          key={i}
          className="mt-10 mb-4 text-2xl font-bold text-white"
        >
          {parseInline(block.slice(3))}
        </h2>
      );
    }

    // ### Heading 3
    if (block.startsWith("### ")) {
      return (
        <h3
          key={i}
          className="mt-8 mb-3 text-xl font-semibold text-white/90"
        >
          {parseInline(block.slice(4))}
        </h3>
      );
    }

    // - List items (consecutive lines starting with "- ")
    if (block.startsWith("- ")) {
      const items = block.split("\n").filter((line) => line.startsWith("- "));
      return (
        <ul key={i} className="my-4 space-y-2 pl-4">
          {items.map((item, j) => (
            <li
              key={j}
              className="flex items-start gap-2 text-base leading-relaxed text-white/60"
            >
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400" />
              <span>{parseInline(item.slice(2))}</span>
            </li>
          ))}
        </ul>
      );
    }

    // Regular paragraph
    return (
      <p key={i} className="text-base leading-relaxed text-white/60">
        {parseInline(block)}
      </p>
    );
  });
}

function parseInline(text: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  const regex = /\*\*(.+?)\*\*/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    parts.push(
      <strong key={match.index} className="font-semibold text-white/80">
        {match[1]}
      </strong>
    );
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length === 1 ? parts[0] : <>{parts}</>;
}
