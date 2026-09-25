// Relative imports, so that Node's test runner can load this file without the alias.
import { areas, type Area, type AreaSlug } from "../content/en/areas.ts";
import { home } from "../content/en/home.ts";

/** The address of an area's page. */
export function servicePath(slug: AreaSlug): string {
  return `/services/${slug}`;
}

/** The area with this slug, or undefined when nothing matches. */
export function areaBySlug(slug: string): Area | undefined {
  return areas.find((area) => area.slug === slug);
}

/** The problems on the home page that point at this area, in their order there. */
export function problemsFor(slug: AreaSlug): string[] {
  return home.problems.items
    .filter((problem) => problem.area === slug)
    .map((problem) => problem.text);
}
