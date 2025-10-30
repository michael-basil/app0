export const flows = [
  // Login
  { slug: "social",     title: "Social Login (Google)",       category: "Login" },
  { slug: "mfa",        title: "Database Login + MFA",        category: "Login" },
  { slug: "verify",     title: "Email Verification Gate",     category: "Login" },

  // Enrichment
  { slug: "country",    title: "Country Metadata",            category: "Enrichment" },

  // Registration
  { slug: "disposable", title: "Disposable Email Block",      category: "Registration" },
  { slug: "terms",      title: "Terms & Conditions",          category: "Registration" },
];

// Slide order (Prev/Next follows this exact list)
export const flowOrder = flows.map(f => f.slug);
