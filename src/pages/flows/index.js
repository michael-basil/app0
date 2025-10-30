export const flows = [
  // Login
  { slug: "branding",    title: "Universal Login Branding",        category: "Login" },
  { slug: "social",      title: "Social Login (Google)",           category: "Login" },
  { slug: "db-login",    title: "Email / Password Login",          category: "Login" },
  { slug: "verify",      title: "Email Verification Gate",         category: "Login" },
  { slug: "mfa-only-db", title: "MFA for DB Users Only",           category: "Login" },

  // Enrichment
  { slug: "country",     title: "Country Metadata (on login)",     category: "Enrichment" },

  // Registration
  { slug: "disposable",  title: "Disposable Email Blocking",       category: "Registration" },
  { slug: "terms",       title: "Terms & Conditions",              category: "Registration" },
];

// Prev/Next order
export const flowOrder = flows.map(f => f.slug);
