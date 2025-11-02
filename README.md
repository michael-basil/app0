# Cruise0 Modernization: From Idea to Transformation

A proof of concept demonstrating how **Auth0** powers Cruise0’s modernization journey:

- Seamless Social Sign-Up (Google)  
- Verified Sign-Up + MFA (Email/Password + MFA)  
- Block Disposable Emails (Action + Validator)

Live Demo: <https://cruise0.basil.one>  
Presentation Deck: <https://deck.cruise0.basil.one>

---

## Why This Exists

**Modernization builds capability. Transformation redirects attention.**  

By simplifying identity plumbing, teams regain focus on customer value, brand trust, and insight.

---

## What You’ll See

- **Branded Universal Login** with Cruise0 logo and ocean imagery  
- **Landing Page → “Top Deck: The Sundeck”** (auth-gated)  
- **Sundeck → “Dive into the Engine Room”** (auth-gated)  
- **Below Deck: The Engine Room** — three flow cards (auth-gated)  
- **Per-flow pages** with _“Back to Engine Room”_ navigation  

---

## Tech Stack & Features

- React (Vite) + Auth0 SPA SDK *(See [Auth0 React SPA Quickstart](https://auth0.com/docs/quickstart/spa/react))*
- Actions: Post-login enrichment (country from IP) + Terms consent  
- Conditional MFA for database users (social logins bypass MFA)  
- Disposable Email Validation (Action + custom validator)

---

## Quick Start

### 1. Configure the Cruise0 Identity Provider (Auth0)

If you don’t already have a tenant, create a free Auth0 development tenant:

[https://auth0.com/signup](https://auth0.com/signup)

Application Settings:

| Setting | Value |
|----------|--------|
| Application Name | Cruise0 SPA |
| Authentication Methods | Database, Google |
| Application Type | Single Page Application |

From the [Applications Dashboard](https://manage.auth0.com/dashboard/#/applications), open the *Cruise0* application, navigate to *Settings* and note:

- OAuth Domain 
- OAuth Client ID

Then update the following:

| Setting | Example |
|----------|----------|
| Application Logo | `https://YOUR_HOST/logo.png` |
| Allowed Callback URLs | `https://YOUR_HOST/sundeck` |
| Allowed Logout URLs | `https://YOUR_HOST` |
| Allowed Web Origins | `https://YOUR_HOST` |

Save changes.

#### Enable MFA

Before continuing, enable at least one multi-factor authentication method (such as *One-time Password (OTP)*) for your tenant. This ensures your database connection flow can prompt for MFA when configured later.

Visit: [Auth0 → Security → Multi-factor Auth](https://manage.auth0.com/dashboard/#/security/mfa)


---

### 2. Bootstrap and Launch the SPA

```bash
cp .env.example .env.local
# then set your values:
# VITE_AUTH0_DOMAIN=yourtenant.region.auth0.com
# VITE_AUTH0_CLIENT_ID=your_client_id

npm install
npm run dev
```

---

### 3. Apply Cruise0 Branding

Visit [Branding → Universal Login Customizations](https://manage.auth0.com/dashboard/#/universal-login/customizations-new) in your Auth0 dashboard.

You’ll update three areas: **Colors**, **Widget**, and **Page Background**.  
Each section has its own “Save and Publish” action.

---

#### a. Colors

From *Update branding theme → Colors*, set:

| Setting | Value |
|----------|--------|
| Primary button | `#0077B6` |

Click *Save and Publish*.

---

#### b. Widget

From *Update branding theme → Widget*, set:

| Setting | Value |
|----------|--------|
| Logo url | `https://YOUR_HOST/logo.png` |

Click *Save and Publish*.

---

#### c. Page Background

From *Update branding theme → Page Background*, set:

| Setting | Value |
|----------|--------|
| Background color | `#000000` |
| Background image url | `https://YOUR_HOST/background.jpg` |


Click *Save and Publish* again.

---

✅ **Result:** Your Universal Login will now use Cruise0’s colors, logo, and background imagery, aligning your authentication experience with the overall brand theme.

> **Note:** This setup just scratches the surface of what’s possible with Auth0’s branding and UX customization.  
> Explore advanced options such as custom CSS, templates, and branding APIs here:  
> [https://auth0.com/docs/customize](https://auth0.com/docs/customize)


### 4. Verify the SPA → Auth0 Integration

Once branding and configuration are complete, validate that your Single Page Application (SPA) is communicating properly with Auth0.  
At this stage, **Actions have not yet been applied**, so you won’t see post-login enrichment or disposable email validation — this step simply confirms the core integration.

---

#### a. Launch the Application

Start the development server (if not already running), then open your app in the browser (for example, `https://localhost:5173` or your configured host).

---

#### b. Test Both Authentication Flows

1. Social Sign-In (Google)
   - Navigate to `https://YOUR_HOST/logout` to ensure a clean session.
   - From the landing page, select *Sign In to Board*.
   - In Universal Login, choose *Continue with Google*.
   - Verify redirect to the authenticated *Sundeck* page.
   - From Sundeck, select *Dive into the Engine Room* to confirm gated routing.
   - Logout to end and clear the session.

2. Database Sign-Up (Email/Password)
   - Navigate to `https://YOUR_HOST/logout` to ensure a clean session.
   - From the landing page, select *Sign In to Board*.
   - In Universal Login, choose *Sign Up* and register with email/password (database connection).
   - Verify redirect to the authenticated *Sundeck* page.
   - From Sundeck, select *Dive into the Engine Room* to confirm gated routing.
   - Logout to end and clear the session.
   
---

#### c. Verify Users in Auth0 Dashboard

Visit [Auth0 → User Management → Users](https://manage.auth0.com/dashboard/#/users).  
You should now see both user records:

- One for the *Google social connection* 
- One for the *Database connection*

Confirm expected profile attributes such as name, email, and connection type.

---

### 5. Configure and Tune Advanced Flows

To extend your setup beyond basic integration, visit the *Engine Room* in the SPA.

From there, explore the flow cards for the areas you’re interested in.

Each flow details the experience, requirements, core implementation details and relevant reference links.

Apply and tune these directly in your tenant as desired.

---

✅ **Result:** Your SPA is now verified to communicate successfully with Auth0, supporting both database and social login flows.  
You’re ready to proceed with implementing **Actions** and intermediate and advanced identity capabilities.

---

## 💡 Key Idea

> **Modernization builds capability. Transformation redirects attention.**  
> When identity flows effortlessly, teams can focus where it matters most — on **momentum** and **customer experience**.