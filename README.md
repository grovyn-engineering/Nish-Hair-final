# LustraHair Try-On Studio

Build LustraHair — AI-Powered Virtual Hair Try-On Experience

You are a senior product designer and frontend engineer.

Build a polished, production-quality customer-facing web application for a fictional premium hair and beauty e-commerce brand called LustraHair.

This is a software developer assignment with an 18-hour implementation constraint.

The goal is NOT to build a generic AI image generator or an admin dashboard.

The goal is to create a convincing consumer beauty experience where a customer can:

Discover → Upload Photo → Choose Look → Customize → AI Try-On → Compare Result → View Product → Take Action

The final application should feel like a real premium beauty-commerce product.

1. Technology

Use:

Next.js

TypeScript

Tailwind CSS

Modern React

App Router

Lucide React or another lightweight icon library

Clean reusable components

Responsive design

Accessible semantic HTML

Do not introduce unnecessary libraries or infrastructure.

Keep the architecture clean and easy to extend.

2. Brand

Brand name:

LustraHair

Primary positioning:

See Your Next Look Before You Buy

Supporting message:

Upload a photo, explore personalized hairstyles, lengths and colors, and preview your next look before making a purchase.

Brand personality:

Premium

Elegant

Modern

Warm

Trustworthy

Beauty-focused

Editorial

Customer-friendly

Do NOT copy the design, branding, text, layout, or visual identity of any existing hair website.

The provided reference website is only for understanding the business category.

3. Visual Design

Use a sophisticated light-only visual system.

Primary background:

Warm ivory / off-white.

Typography:

Elegant serif typography for major headings

Clean modern sans-serif typography for body content and controls

Visual characteristics:

Large editorial imagery

Premium whitespace

Dark espresso/brown typography

Subtle champagne/gold accents

Soft beige surfaces

Rounded cards

Fine borders

Very subtle shadows

Smooth hover states

Elegant micro-interactions

Refined button animations

Avoid:

Dark mode

Neon colors

Developer-dashboard aesthetics

Excessive gradients

Excessive glassmorphism

Generic AI-tool styling

Dense layouts

Huge unnecessary animations

The site should look like a premium beauty-commerce brand.

4. Main User Journey

The primary customer journey must be extremely obvious:

Home
↓
Try Your Look
↓
Upload Photo
↓
Choose a Hairstyle
↓
Customize Color / Length
↓
Generate AI Preview
↓
Processing State
↓
Before / After Result
↓
Related Product
↓
Add to Cart / Save Look / Consultation
↓
Try Another Look

A user should understand this flow without assistance.

5. Homepage

Create a polished landing page.

Navbar

Include:

LustraHair logo/wordmark

Shop

Virtual Try-On

Our Story

Help

Primary CTA:

Try Your Look

Navbar should become mobile-friendly with a clean mobile menu.

Hero

Headline:

See Your Next Look Before You Buy

Supporting copy:

Upload a photo and discover personalized hairstyles, lengths and colors with LustraHair's AI-powered virtual try-on experience.

Primary CTA:

Try Your Look

Secondary CTA:

Explore Looks

Use a premium editorial hair image on the hero.

The hero should immediately communicate:

This is a hair product brand.

AI try-on is available.

The customer can see how a look could appear before purchasing.

6. How It Works

Create a three-step section.

01 — Upload

Upload a clear photo of yourself.

02 — Choose

Select a hairstyle, length and color.

03 — Discover

See your personalized AI preview and find the matching LustraHair product.

Use elegant numbered cards or minimal visual steps.

7. Featured Looks

Create a premium look-selection section.

Title:

Explore Your Next Look

Subtitle:

From effortless waves to polished lengths, discover styles designed to fit your mood.

Create five looks:

Signature Waves

Long Straight

Soft Curls

Classic Bob

Layered Volume

Each look card should contain:

Image

Name

Short description

Category

Starting price

Try Look CTA

Cards should have polished hover interactions.

8. Virtual Try-On Studio

Create a dedicated /try-on experience.

The studio should guide the customer through a simple step-based journey.

Show a progress indicator:

1 Photo → 2 Look → 3 Preview

9. Upload Photo Step

Title:

Start With Your Photo

Supporting text:

For the most realistic result, use a clear front-facing photo with good lighting.

Upload area must support:

Click to upload

Drag and drop

JPG

PNG

WEBP

Maximum 10MB

Display:

Upload icon

Upload instructions

File requirements

After upload:

Show the uploaded image.

Allow:

Change Photo

and:

Continue

Validate:

No file

Unsupported format

File larger than 10MB

Broken image

Show friendly error messages.

10. Choose Look Step

Title:

What Would You Like To Try?

Display the five hairstyle cards:

Signature Waves

Long Straight

Soft Curls

Classic Bob

Layered Volume

The selected card should have a clear visual selected state.

Do not immediately generate after clicking a card.

Let the user understand their selection first.

11. Customization

After selecting a hairstyle, allow customization.

Length

Options:

18"
22"
26"

Color

Options:

Black

Dark Brown

Chestnut

Honey Blonde

Use elegant color swatches.

Display the current selection clearly.

Example:

Signature Waves · 22" · Dark Brown

Primary CTA:

Try This Look

Secondary:

Back

12. AI Processing State

When the user clicks "Try This Look", create a premium processing experience.

Title:

Creating Your Look

Show progress/status stages:

✓ Analyzing your photo

✓ Understanding your hair profile

● Creating your personalized style

○ Preparing your preview

Include a subtle animated indicator.

Do NOT make the UI look frozen.

The actual AI API integration should later be connected through a server-side API route.

13. AI Integration Architecture

Prepare the frontend for a real AI hairstyle generation API.

Do not put secret API keys into client-side code.

The architecture should eventually be:

Frontend
→ Next.js API route
→ AI hairstyle provider
→ generated image
→ frontend result

Create a clean service abstraction so the AI provider can be replaced later without rewriting the UI.

Example conceptual interface:

generateHairTryOn({
image,
hairstyle,
color,
length
})

Return:

{
resultImageUrl,
status
}

Do not hardcode API keys.

Use environment variables.

14. Result Experience

After generation, display:

Your New Look Is Ready

Show a large Before / After comparison.

The original uploaded image must be shown as:

Before

The generated image must be shown as:

After

Implement a polished draggable before/after slider.

The slider must work on:

Desktop

Tablet

Mobile

Also display:

Selected hairstyle:

Signature Waves

Selected configuration:

22" · Dark Brown

Actions:

Try Another Look

Save Look

15. Product Recommendation

Immediately connect the AI result to a relevant LustraHair product.

Example:

LustraHair Signature Waves

Premium Human Hair Collection

₹12,999

Available in:

Black · Dark Brown · Chestnut · Honey Blonde

Include:

Product image

Product title

Short description

Price

Selected color

Selected length

Add to Cart button

Primary CTA:

Add to Cart

Secondary actions:

Save Look

Request Consultation

No real payment system is required.

For Add to Cart, create a polished confirmation state such as:

Added to your LustraHair bag

16. Try Another Look

After seeing a result, allow the customer to return to look selection without losing their uploaded photo.

The experience should make experimentation easy.

Example:

Try Another Look

opens the hairstyle selector again.

17. AI Stylist Recommendation

If appropriate, add a small premium recommendation card below the result.

Example:

AI Stylist's Pick

"Signature Waves in Dark Brown adds natural-looking length and soft volume while keeping the overall finish effortless."

CTA:

Try Stylist's Pick

This should be secondary to the core experience.

Do not allow this feature to complicate the main flow.

18. Error Handling

Build proper error states.

Upload errors:

Unsupported file

File too large

No file

Invalid image

AI errors:

Generation failed

Timeout

Network error

Empty result

Use friendly customer-facing copy.

Example:

We couldn't create your preview this time.

Please try again or choose another look.

Buttons:

Try Again

Choose Another Look

Do not expose technical error messages to customers.

19. AI Fallback

Because the application is a prototype, architect the AI layer so a fallback result can be shown if the external AI provider is temporarily unavailable.

Important:

Do not falsely claim a fallback image was generated from the customer's uploaded photo.

If fallback mode is used, clearly communicate that it is a sample preview.

The real AI integration remains the primary path.

20. Responsive Design

The entire application must be responsive.

Desktop:

Large editorial layouts

Two-column hero

Spacious cards

Tablet:

Adapt grids

Maintain readable spacing

Mobile:

Single-column layouts

Full-width CTAs

Touch-friendly controls

Swipe/drag before-after slider

Mobile-friendly upload

Compact navigation

Test approximately:

320px
375px
768px
1024px
1440px

21. Accessibility

Use:

Semantic HTML

Proper button elements

Labels

Alt text

Keyboard navigation

Visible focus states

Accessible color contrast

Meaningful loading states

Do not rely only on color to communicate selection.

22. Component Architecture

Create reusable components:

Navbar
Hero
HowItWorks
LookCard
LookGrid
UploadZone
ImagePreview
ProgressIndicator
CustomizationPanel
ProcessingState
BeforeAfterSlider
ProductCard
ProductRecommendation
AIStylistCard
ErrorState
Footer

Avoid putting the entire application into one large component.

23. Data Architecture

Keep hairstyles/products in separate data files.

Example conceptual hairstyle data:

{
id: "signature-waves",
name: "Signature Waves",
description: "Soft cascading waves with natural movement.",
category: "Wavy",
image: "...",
productId: "signature-waves-product",
availableColors: [
"Black",
"Dark Brown",
"Chestnut",
"Honey Blonde"
],
availableLengths: [
"18",
"22",
"26"
]
}

Create five hairstyle records and matching product records.

Do not create a database for this prototype unless it becomes necessary.

24. State Management

Keep the main try-on state clear:

uploadedImage

selectedLook

selectedColor

selectedLength

generationStatus

generatedImage

error

cartState

Avoid unnecessary global state libraries.

React state/context is sufficient.

25. Micro-interactions

Add subtle interactions:

Button hover

Card hover

Image zoom

Selected look transition

Smooth section transitions

Loading animation

Add-to-cart confirmation

Before/after slider feedback

Do not over-animate the application.

The goal is premium, not flashy.

26. Important Product Principle

The application must continuously communicate:

AI is helping the customer make a better purchase decision.

Do not make AI the product itself.

The product is:

Confidence before purchase.

27. Do NOT build

Do not spend time on:

Admin dashboard

Authentication

Payment gateway

Full e-commerce backend

Complex database

User accounts

Enterprise infrastructure

Kubernetes

Microservices

Training an AI model

30+ hairstyles

Prioritize the core customer experience.

28. Final Success Criteria

A first-time visitor should be able to:

Understand the product immediately.

Click Try Your Look.

Upload a photo.

See their uploaded photo.

Select a hairstyle.

Select color and length.

Start AI generation.

See a processing state.

Receive a meaningful result.

Compare Before / After.

Understand what look was selected.

See the matching product.

Take an action.

Try another look.

The experience should feel like a real premium beauty-commerce product.

Build the frontend first with realistic mock data and a mock generation service.

Do not block frontend development waiting for the AI API.

Keep the AI service abstraction ready so the real provider can be integrated afterward.

Start by implementing the homepage, then the /try-on studio, then the result experience.

Make every screen polished, responsive and production-quality.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

---

## Project Integration Details

### Project
**LustraHair** — AI-Powered Virtual Hair Try-On Experience

### Features
* **AI Hairstyle Try-On**: Virtual haircut change based on a portrait photo.
* **Photo Upload**: Supports drag-and-drop JPG, PNG, and WEBP image file inputs up to 10MB.
* **Hairstyle Selection**: Displays 5 editorial haircut styles (*Signature Waves*, *Long Straight*, *Soft Curls*, *Classic Bob*, *Layered Volume*).
* **Hair Color Selection**: Custom swatches for *Black*, *Dark Brown*, *Chestnut*, and *Honey Blonde*.
* **Length Selection**: Product sizing options for *18"*, *22"*, and *26"*.
* **Before/After Comparison**: Draggable comparison slider with all-caps layout design.
* **Product Recommendations**: Instant matching of generated hairstyles to the physical LustraHair catalog.
* **Save Look**: Local caching of generated styles in `localStorage` with metadata.
* **Add to Cart**: Real-time visual feedback ("Added ✓") and shopping bag toast notifications.
* **Consultation Request**: Overlay styling consultation form submitting locally.
* **Responsive Design**: Mobile, tablet, and desktop adaptive grids.
* **Error Handling**: Friendly error layouts for network timeouts, uploads, and rate limits.

### Technology
* **Core Framework**: React 19, TypeScript
* **Routing**: TanStack Router (file-based API)
* **Server/Backend**: TanStack Start (Nitro H3 handler) for the secure API route (`POST /api/try-on`)
* **Styling**: Tailwind CSS v4.x
* **Icons**: Lucide React
* **Feedback Alerts**: Sonner toasts

### AI Approach
The application implements a secure server-side try-on workflow to perform real face-preserving hairstyle swaps:

1. The customer uploads a front-facing portrait photo through the frontend.
2. The image is converted into a base64 Data URL and submitted securely via the API client `generateTryOn` to our backend endpoint `POST /api/try-on`.
3. The server endpoint validates inputs, maps frontend hairstyle names to API models (e.g. *Signature Waves* to *LongWavy*), validates sizes (max 10MB) and formats, and forwards the payload to the **TryItOn Hairstyle API** endpoint (`POST https://tryiton.now/api/v1/tryon/hairstyle`).
4. TryItOn returns a `jobId`.
5. The backend endpoint securely executes the status polling loop (`GET https://tryiton.now/api/v1/status/{jobId}`) every 3 seconds until completed.
6. Once the status becomes `completed`, the final generated image URL is returned to the frontend and rendered in the Before/After comparison slider.

### Environment Variables
* `TRYITON_API_KEY`: Secret API key for authorizing calls to the TryItOn platform. Add this to your local `.env` file to start using the real AI generations!

### Known Limitations
* **Credit Constraints**: AI try-on is credit-dependent on the external accounts.
* **Processing Delay**: Image generation requires GPU queues (30–60s) which requires asynchronous polling.
* **Aspect Ratio**: The output model aspect ratios can occasionally vary depending on source image alignment.

### Production Improvements
* **Persistent Result Storage**: Cloud storage (e.g., AWS S3 or Supabase Storage) to cache generated images rather than relying on external CDN lifespans.
* **User Accounts**: Authentication layer to link saved looks to accounts.
* **Analytics**: Tracking conversion rates from try-on to purchase actions.
* **Stronger Rate Limiting**: Server-side client IP rate-limiting to protect API key credits.
* **Moderation Filter**: Automated safety checks to filter out inappropriate image uploads before calling TryItOn.
* **CDN/Image Compression**: Image optimization pipeline to compress source photos before API delivery.
