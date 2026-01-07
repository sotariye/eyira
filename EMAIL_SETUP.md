# How to Setup Automated Emails

## Option 1: Stripe Default Receipts (No Code Required)
This is the fastest way to get email receipts working.

1. Log in to your **Stripe Dashboard**.
2. Go to **Settings** (gear icon) > **Customer emails**.
3. Toggle **ON**: "Email customers about successful payments".
4. (Optional) Customize your colors and logo in **Settings** > **Branding**.

**Pros:** Instant setup.
**Cons:** Generic look; cannot send specific "Pickup Instructions" different from "Shipping Instructions".

---

## Option 2: Custom Branded Emails (Recommended for "Eyira")
To send custom emails (like "Your Ottawa Pickup is Ready"), you need a webhook.

### 1. Get an Email Provider
We recommend **Resend** (it's free and works great with React).
1. Go to [Resend.com](https://resend.com) and sign up.
2. Get your **API Key**.
3. Verify your domain (e.g., `eyira.shop`).

### 2. Configure Vercel
Add these Environment Variables in Vercel:
- `RESEND_API_KEY`: (Your key from step 1)
- `STRIPE_WEBHOOK_SECRET`: (See step 3 below)

### 3. Setup Stripe Webhook
1. Go to Stripe Dashboard > **Developers** > **Webhooks**.
2. Click **Add Endpoint**.
3. URL: `https://your-site.vercel.app/api/webhook`
4. Events to listen for: `checkout.session.completed`
5. Click **Add endpoint**.
6. Reveal the **Signing secret** (whsec_...) and add it to Vercel as `STRIPE_WEBHOOK_SECRET`.

### 4. The Code
We have created a file `api/webhook.js` for you. You will need to uncomment the email sending logic once you have your Resend key.
