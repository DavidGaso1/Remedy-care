# Remedy Care - Natural Health Solutions

A static website for Remedy Care, showcasing natural health solutions with webhook integration for form submissions.

## 🚀 Deployment to GitHub Pages

This site is configured for static export and GitHub Pages deployment.

### Prerequisites
- Node.js 20 or higher
- npm

### Local Development

1. Install dependencies:
```bash
npm install
```

2. Run development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
```

This will generate a static site in the `out` folder.

### Deploy to GitHub Pages

1. **Push to GitHub:**
   - Create a new repository on GitHub
   - Push this code to the repository

2. **Enable GitHub Pages:**
   - Go to repository Settings → Pages
   - Under "Build and deployment", select "GitHub Actions" as the source
   - The workflow in `.github/workflows/deploy.yml` will automatically deploy on push to main

3. **Configure Custom Domain (Optional):**
   - Add a CNAME file in the `public` folder with your domain
   - Configure DNS settings with your domain provider

### Webhook Integration

Form submissions are sent to:
```
https://n8n.simeonsamari.com/webhook/Remedy Care
```

The webhook receives order data with the following structure:
```json
{
  "type": "order",
  "productName": "Product Name",
  "packLabel": "Pack Label",
  "packPrice": 50000,
  "packBottles": 2,
  "customer": "Customer Name",
  "phone": "08012345678",
  "address": "Delivery Address",
  "deliveryDate": "2024-01-01",
  "paymentOption": "Transfer",
  "submittedAt": "2024-01-01T00:00:00.000Z"
}
```

## 📞 Contact Information

- **Email:** rahinaaliyualiyu@gmail.com
- **Phone:** 08065648442, 08137383428
- **WhatsApp:** +2348065648442
- **Address:** Ide Plaza Utako, Ajose Adeogun Street, Abuja

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (Static Export)
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Deployment:** GitHub Pages
- **Form Handling:** Webhook (n8n)

## 📁 Project Structure

```
├── app/                    # Next.js app directory
│   ├── about/             # About page
│   ├── blood-pressure/    # Product pages
│   ├── diabetes/
│   ├── ed-sexual-health/
│   ├── infection/
│   ├── joint-pain/
│   ├── prostate/
│   ├── ulcer/
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
├── lib/                   # Utility functions
├── public/                # Static assets
└── .github/workflows/     # GitHub Actions

```

## 🔧 Configuration

### Next.js Config (`next.config.mjs`)
- Static export enabled
- Image optimization disabled (for GitHub Pages)
- Trailing slashes enabled

### Environment Variables
No environment variables required for static deployment.

## 📝 Notes

- All database functionality has been removed
- Admin panel has been removed
- All forms submit directly to the webhook
- Site is fully static and can be hosted on any static hosting service
- No server-side code or API routes

## 📄 License

All rights reserved © 2025 Remedy Care
