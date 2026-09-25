/**
 * Whether the markers for details that are still coming, and the drafts the owner has
 * not approved, are rendered.
 *
 * They show in `npm run dev`, in `npm run preview:soon` and in pull request previews,
 * where the gaps are worth seeing. They never show in the production build: a live site
 * does not advertise what it has not got.
 */
export const showSoon =
  process.env.NODE_ENV === "development" || process.env.SHOW_SOON === "1";
