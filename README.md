# Cruise0 Modernization: From Idea Through Transformation

A proof-of-concept showing how Auth0 powers Cruise0’s modernization:
- **Seamless Social Sign-Up** (Google)
- **Verified Sign-Up + MFA** (email/password + MFA)
- **Block Disposable Email** (Action + domain validator)

**Live demo:** https://cruise0.basil.one  
**Presentation deck:** https://deck.cruise0.basil.one

---

## Why this exists
Modernization builds capability. **Transformation redirects attention** — away from identity plumbing and toward customer value, brand trust, and insight.

---

## What you’ll see
- **Branded Universal Login** with Cruise0 logo & ocean imagery
- **Landing → “Enter the Engine Room”** (auth-gated)
- **Below Deck: The Engine Room** (three flows as cards)
- **Per-flow pages** with “Return to the Bridge” navigation

---

## Tech & features
- React (Vite), Auth0 SPA
- Actions: post-login enrichment (country from IP), T&C capture
- Conditional MFA (database users), **social MFA bypass**
- Disposable email check (Action + validator)

---

## Quick start
```bash
cp .env.example .env.local
# set your values:
# VITE_AUTH0_DOMAIN=...
# VITE_AUTH0_CLIENT_ID=...

npm install
npm run dev
```

---

## Deploying flow implementations in Auth0

Once the app is up and running, the next step is connecting the front-end experience to its matching configurations inside Auth0.
Each flow card in the Engine Room includes high-level Implementation Notes that outline what needs to be applied in your Auth0 tenant.
