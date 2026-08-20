# NishHair Try-On Studio

An AI-powered virtual hair try-on studio built for **NishHair**—a premium, elegant beauty-commerce brand. This application allows customers to upload their own portrait photo, select a desired hairstyle, customize its length and color, and instantly preview how it looks on them using the official TryItOn Hairstyle API.

---

## 🌟 Key Features

- **Draggable Before/After Slider**: Interactive visual comparison of the customer's original photo against the AI-generated styled hairstyle.
- **Dynamic Product Mapping**: Instantly recommends matching physical hair extensions/wigs from the NishHair catalog based on the tried-on style.
- **Color & Length Customizations**: Personalize looks with standard lengths (18", 22", 26") and custom color swatches (Black, Dark Brown, Chestnut, Honey Blonde).
- **Secure Server-Side API**: Direct API requests containing sensitive credentials run strictly server-side, protecting tokens from browser access.
- **Premium Loading States**: Real-time multi-stage loader indicating exactly what visual transformations are being applied (*Analyzing*, *Profile Syncing*, *Personalizing*, *Preparing Preview*).
- **Add to Cart & Local Storage**: Adds configurations to the shopping bag with toaster alerts, and stores saved configurations locally.
- **Stylist Consultation**: Quick overlay modal requesting personal information to submit preferences directly.

---

## 🛠️ Technology Stack

- **Core Framework**: React 19, TypeScript
- **Routing & SSR**: TanStack Start / TanStack Router
- **Backend/API Routing**: Supabase Edge Functions (Deno / TypeScript)
- **Styling**: Tailwind CSS v4.x
- **Icons**: Lucide React
- **Notifications**: Sonner

---

## ⚙️ Project Architecture

```text
               [ NishHair Frontend ]
                 │                  │
                 │ (POST /try-on)   │ (POST /try-on-status)
                 ▼                  ▼
             [ Supabase Edge Functions /v1 ]
                 │                  │
                 │ (submit job)     │ (poll status)
                 ▼                  ▼
             [ TryItOn Hairstyle API ]
                 │ (jobId)          │ (completed result)
                 └──────────────────┴─────► [ Before/After Slider ]
```

---

## 🚀 Getting Started

Follow these steps to run the NishHair Try-On Studio locally:

### 1. Prerequisites
Ensure you have Node.js (v18.x or later) installed on your system.

### 2. Clone and Setup Dependencies
Clone the repository, enter the project directory, and install dependencies:
```bash
git clone <repository-url>
cd AI-Powered-Virtual-Hair-Try-On-Experience
npm install
```

### 3. Configure Secrets & Environment
1. **Frontend Environment**: Create a `.env` file in the root directory and set your Supabase Project URL:
   ```env
   VITE_SUPABASE_URL=https://your-project-ref.supabase.co
   ```
2. **Edge Functions Secret**: Set your TryItOn developer API key as a Supabase Edge Function secret:
   ```bash
   supabase secrets set TRYITON_API_KEY=your_try_it_on_api_key_here
   ```
   *(You can get your API key from the [TryItOn Developer Dashboard](https://tryiton.now/app/developer))*

### 4. Run Local Development Server
Start the development server:
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:3000` to preview the NishHair Studio.

---

## 📂 Directory Structure

- `supabase/functions/` - Supabase Deno Edge Functions (`try-on/index.ts` and `try-on-status/index.ts`).
- `src/routes/` - TanStack Router page views (Homepage, and Try-on studio page).
- `src/components/site/` - Reusable UI components (Sliders, panels, header, footer, loaders, modals, error panels).
- `src/config/` - Mappings, hairstyle allowed values lists, and color prompts.
- `src/lib/` - Frontend service clients (`tryOnService.ts`), error reporters, and utils.
- `src/data/` - Static catalog details for NishHair products and styles.
- `public/` - Static assets and icons.

---

## ⚠️ Known Limitations
- **External API dependency**: Previews rely on the availability of GPU queues on the TryItOn platform. Jobs typically complete within 15–30 seconds.
- **API Credits**: A valid API key with sufficient credits is required for hairstyle generations. If the key lacks credits or is missing, a helpful error notification is rendered in the UI with a retry option.
