export const flows = [
  // Login
  { slug: "branding",       title: "Universal Login Branding",    category: "Login" },
  { slug: "social",         title: "Social Login (Google)",       category: "Login" },
  { slug: "db-login-mfa",   title: "DB Login + MFA",              category: "Login" },
  { slug: "verify",         title: "Email Verification Gate",     category: "Login" },

  // Enrichment
  { slug: "country",        title: "Country Metadata",            category: "Enrichment" },

  // Registration
  { slug: "disposable",     title: "Disposable Email Blocking",   category: "Registration" },
  { slug: "terms",          title: "Terms & Conditions",          category: "Registration" },
];

export const flowOrder = flows.map(f => f.slug);
