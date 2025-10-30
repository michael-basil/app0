export const flows = [
  { slug: "terms",      title: "Terms & Conditions" },
  { slug: "mfa",        title: "MFA (DB users)" },
  { slug: "disposable", title: "Disposable Email Block" },
  { slug: "country",    title: "Country Metadata" }
];

export const flowOrder = flows.map(f => f.slug);
