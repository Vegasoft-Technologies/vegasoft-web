/** The two-digit number shown beside a list entry: "01" for the first. */
export function numbering(index: number): string {
  return String(index + 1).padStart(2, "0");
}
