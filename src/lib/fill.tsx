import { Fragment, type ReactNode } from "react";

/**
 * Fills a sentence from a content file: every {name} is replaced by the value under that
 * name, which may be a word or a piece of markup. Each language writes the sentence in
 * the order it needs, and the component only supplies the values.
 */
export function fill(template: string, values: Record<string, ReactNode>): ReactNode {
  const parts: ReactNode[] = [];
  const pattern = /\{(\w+)\}/g;
  let last = 0;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(template)) !== null) {
    if (match.index > last) parts.push(template.slice(last, match.index));
    parts.push(values[match[1]]);
    last = match.index + match[0].length;
  }
  if (last < template.length) parts.push(template.slice(last));
  return parts.map((part, index) => <Fragment key={index}>{part}</Fragment>);
}
