// Ambient declarations for the docs app.
//
// Tailwind v4 is imported for its side effects (`import "./globals.css"`),
// which `tsc --noEmit` can't resolve on its own. Declaring the module keeps
// the typecheck gate green without loosening `strict`.
declare module "*.css"
