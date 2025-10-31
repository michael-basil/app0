# 🌿 App0 — Auth0 Modern Identity Demo

App0 is a **minimal modern web app** demonstrating Auth0’s adaptive identity for single-page applications.  
It serves as a **live presentation framework** — each “flow card” represents a real Auth0 feature or pattern, complete with intent, user experience, and implementation notes.

---

## Purpose & Audience

This demo is designed for:
- **Technical Account Managers (TAMs)** showcasing Auth0 capabilities in a customer-centric way.
- **Developers or architects** exploring modern Auth0 + React integration.
- **Evaluators or stakeholders** who prefer guided, hands-on demonstration instead of static slides.

App0 can be:
- **Demoed live** (navigate between `/center` and `/flow/...`)
- **Explored hands-on** (clone and run locally or in Codespaces)
- **Shared as a handout** (`/scroll` view shows all flows with code expanded)

---

## Core Technologies

| Component | Role |
|------------|------|
| **Auth0** | Identity provider for login, MFA, and Actions |
| **React + Vite** | SPA front-end for presentation and flows |
| **Node.js** | Lightweight service layer|
| **Auth0 Actions & Forms** | Extensibility for login, enrichment, and registration logic |

---

## Quick Start

### 0️⃣ Prerequisites
- Node **20.19+** or **22.12+**
- npm **10+**
- An [Auth0 tenant (free account)](https://auth0.com/signup)

You only need two values from your Auth0 dashboard:
- **Domain**
- **Client ID**

---

### 1️⃣ Clone & Install
```bash
git clone https://github.com/<your-username>/app0
cd app0
npm ci
```

---

### 2️⃣ Configure Environment

Create `.env.local` from the sample and add your Auth0 Domain and Client ID:

```bash
cp .env.local.sample .env.local
```

```env
VITE_AUTH0_DOMAIN=YOUR_TENANT.us.auth0.com
VITE_AUTH0_CLIENT_ID=YOUR_PUBLIC_CLIENT_ID
```

> No secrets required — these are standard public SPA values.

---

### 3️⃣ Configure Auth0 Application

Open your [Auth0 Dashboard → Applications](https://manage.auth0.com/#/applications).  
Select your SPA and update the **Settings** section:

| Field                     | Value                          |
| -------------------------- | ------------------------------ |
| **Allowed Callback URLs** | `http://localhost:5173/center` |
| **Allowed Logout URLs**   | `http://localhost:5173/`       |
| **Allowed Web Origins**   | `http://localhost:5173`        |

If you later run in Codespaces or Amplify, add those URLs too (see below).

---

### 4️⃣ Enable Login Connections

From [Auth0 Dashboard → Authentication → Database](https://manage.auth0.com/#/connections/database):

* Ensure the **Username-Password-Authentication** connection exists.

From [Auth0 Dashboard → Authentication → Social](https://manage.auth0.com/#/connections/social):

* Create or enable **Google**.
* In **Applications → Your SPA → Connections**, toggle both **DB** and **Google** on.

> This enables both email/password and Google login flows in your demo.

---

### 5️⃣ Run Locally

```bash
npm run dev
# open http://localhost:5173
```

You’ll start at the landing page (`/`), log in via Auth0, and land at `/center` to explore flows.

---

## Optional: Codespaces and Amplify Hosting

### GitHub Codespaces

Learn more: [About GitHub Codespaces](https://docs.github.com/en/codespaces/overview)

1. Create a Codespace on this repo.
2. Copy `.env.local.sample` → `.env.local` and add your Auth0 Domain + Client ID.
3. Add these to **Allowed URLs** in Auth0:

   * Callback: `https://*.github.dev/center`
   * Logout: `https://*.github.dev/`
   * Web Origins: `https://*.github.dev`
4. Run:

   ```bash
   npm run dev
   # use the forwarded port link
   ```

### AWS Amplify Hosting

Learn more: [AWS Amplify Hosting](https://aws.amazon.com/amplify/hosting/)

1. Connect this GitHub repo in Amplify.
2. Add environment variables:

   * `VITE_AUTH0_DOMAIN`
   * `VITE_AUTH0_CLIENT_ID`
3. In your Auth0 **Application Settings**, add your Amplify URL:

   * Callback: `https://<your-amplify-domain>/center`
   * Logout: `https://<your-amplify-domain>/`
   * Web Origins: `https://<your-amplify-domain>`

---

## Exploring the Flows

Each **Flow Card** highlights a real Auth0 capability.  
The Center page (`/center`) displays all available flows grouped by category, and each one can be opened individually for live demonstration.

These include both **login** and **registration** experiences, as well as enrichment examples and system-side actions. Each flow provides:

* A clear **Intent** — what the capability demonstrates.
* The expected **User Experience** — how it behaves during login or registration.
* A concise **Implementation Summary** — configuration steps or Actions code.
* Links to the relevant **Auth0 documentation** and **dashboard pages**.

You can also visit `/scroll` to render all flows sequentially — ideal for print or export.

---

## Troubleshooting

| Symptom                               | Fix                                                                                                                                    |
| ------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| **White screen after login**          | Check Allowed **Web Origins** and **Callback URLs** match the origin exactly.                                                          |
| **Repeated MFA prompts**              | Ensure MFA Action only triggers for DB logins (`strategy === "auth0"`) and verify MFA settings under **Security → Multi-Factor Auth**. |
| **Google not showing on login**       | Confirm **Social → Google** exists and is toggled on under **Applications → Connections**.                                             |
| **Verification loop / access_denied** | Post-Login Action correctly returns error; ensure SPA handles the redirect.                                                            |
| **CORS errors**                       | Always include your active origin (`localhost`, `github.dev`, `amplifyapp.com`) in **Web Origins**.                                    |

---

## Why it’s This Simple

* Auth0 centralizes authentication, so this SPA needs only **Domain** + **Client ID**.
* Every feature (branding, MFA, metadata enrichment, consent) is configured in the dashboard — no redeploys required.
* The **Scroll** route provides a self-contained, printable reference of all flows and code.
* Developers can reproduce this setup easily using either a local environment, Codespaces, or Amplify hosting.
* The architecture mirrors a real-world deployment but remains intentionally lightweight and readable.

---

## Learn More

* [Auth0 React SDK Quickstart](https://auth0.com/docs/quickstart/spa/react)
* [Auth0 Actions: Flows & Triggers](https://auth0.com/docs/customize/actions/flows-and-triggers)
* [Auth0 Forms](https://auth0.com/docs/customize/forms)
* [Auth0 Actions + Forms](https://auth0.com/docs/customize/forms/render)
* [Auth0 Management Dashboard](https://manage.auth0.com/)

---

## License

Open for demonstration and educational purposes.  
Forks and adaptations encouraged for Auth0 integration learning.

---

Built to illustrate clarity, flow, and fearless simplicity in modern identity. 🌿
