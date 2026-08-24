// Marketing/storefront catalog data for the redesigned home page.
// Ported from the design prototype (nish-hair "-3d-studio" concept), with real
// product photography, store addresses and phone numbers pulled from the live
// nishhair.com site swapped in wherever we could confirm them directly.
//
// NOTE: images below are hotlinked either from nishhair.com's own Shopify CDN
// (real product photography) or from Unsplash stock (placeholders inherited
// from the prototype, used only where we didn't have a confirmed real photo).
// For production, download the nishhair.com CDN assets into src/assets and
// import them locally the same way src/data/looks.ts already does.

import type {
  CatalogProduct,
  TransformationCase,
  StoreLocation,
  JournalArticle,
  CelebrityReview,
  CustomerTestimonial,
  QuizQuestion,
} from "./catalogTypes";

export const PRODUCTS: CatalogProduct[] = [
  {
    id: "silk-base-crown-topper",
    name: "Curly Best Hair Topper - Silk Base",
    category: "toppers",
    subCategory: "Crown Coverage · Invisible Parting",
    price: 38299,
    rating: 4.9,
    reviewsCount: 342,
    image: "https://www.nishhair.com/cdn/shop/files/Besthairtopper-Curly-Naturalblack.png?v=1785153470",
    hoverImage: "https://www.nishhair.com/cdn/shop/files/Besthairtopper-Curly-Naturalblack_2.png?v=1785153471",
    badge: "Bestseller #1",
    shades: ["Natural Black"],
    lengths: ["20 inch", "22 inch"],
    description:
      "Add instant volume and full coverage with tight, defined curls and a natural-looking scalp that blends seamlessly with your hair. 100% natural human hair, silk base 6×6 inch.",
    density: "130% Natural Density",
    baseSize: "6x6 inch Silk Base",
    gender: "women",
    isBestseller: true,
    shopUrl: "https://www.nishhair.com/products/best-hair-topper-curly-natural-black",
  },
  {
    id: "7-set-clip-in-extensions",
    name: "Classic 7-Piece Clip-In Volumizer Set",
    category: "extensions",
    subCategory: "Instant Length & Full Head Volume",
    price: 13499,
    originalPrice: 15999,
    rating: 4.9,
    reviewsCount: 528,
    image: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=800&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?q=80&w=800&auto=format&fit=crop",
    badge: "Shark Tank Pick",
    shades: ["Natural Black", "Mocha Brown", "Honey Blonde Highlights", "Espresso"],
    lengths: ["16 inch", "20 inch", "24 inch"],
    description:
      "Our award-winning 7-piece seamless clip-in system. Adds up to 160g of pure luscious volume in under 3 minutes without heat or glue.",
    density: "160g Full Set",
    gender: "women",
    isBestseller: true,
  },
  {
    id: "feather-clip-in-bangs",
    name: "Clip-in Hairline with Curtain Bangs",
    category: "bangs",
    subCategory: "Zero-Commitment Face Framing",
    price: 3999,
    originalPrice: 4299,
    rating: 4.8,
    reviewsCount: 419,
    image: "https://www.nishhair.com/cdn/shop/files/clip-in_hairline_with_curtain_3_dark_black.jpg?v=1762872102",
    hoverImage: "https://www.nishhair.com/cdn/shop/files/clip-in_hairline_with_curtain_2_dark_black.jpg?v=1762872102",
    badge: "Trending Now",
    shades: ["Dark Black", "Dark Brown", "Natural Black", "Parul's Ombre"],
    lengths: ["6 inch front / 12 inch side"],
    description:
      "Soft, face-framing curtain bangs without the commitment of a haircut. 100% natural human hair that integrates smoothly with your own hairline.",
    density: "Natural Wispy",
    gender: "women",
    isBestseller: true,
    shopUrl: "https://www.nishhair.com/products/clip-in-hairline-with-curtain-bangs-human-hair-nish-hair",
  },
  {
    id: "men-lace-front-toupee",
    name: "Invisible Front Lace Men's Toupee",
    category: "men",
    subCategory: "Lace & Poly Base · Natural Hairline",
    price: 18499,
    originalPrice: 22000,
    rating: 4.9,
    reviewsCount: 184,
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
    badge: "Discreet Packaging",
    shades: ["Natural Jet Black", "Off-Black", "Natural Salt & Pepper (15% Grey)"],
    lengths: ["6 inch (Cut & Style Ready)"],
    description:
      "100% human hair men's hair replacement system with French lace front for an undetectable hairline even when combed back.",
    density: "110% Natural Medium",
    baseSize: "8x10 inch (Trimmable)",
    gender: "men",
    isBestseller: true,
  },
  {
    id: "front-thinning-patch",
    name: "Front Hair Thinning Cover Up Patch",
    category: "toppers",
    subCategory: "Hairline & Parting Coverage",
    price: 1999,
    rating: 4.8,
    reviewsCount: 231,
    image: "https://www.nishhair.com/cdn/shop/files/Frontlinecoverpatch.jpg?v=1759994654",
    hoverImage: "https://www.nishhair.com/cdn/shop/files/Frontlinecoverpatch_2.jpg?v=1759994654",
    badge: "Under ₹1999",
    shades: ["Natural Black", "Dark Brown"],
    lengths: ["Standard"],
    description:
      "A lightweight lace patch that covers a thinning front hairline or widening parting in seconds - no clips showing, no salon visit needed.",
    density: "Natural Medium",
    gender: "women",
  },
  {
    id: "instant-ponytail-wrap",
    name: "Sleek Glamour Wrap-Around Ponytail",
    category: "ponytails",
    subCategory: "High Volume Runway Ponytail",
    price: 6499,
    originalPrice: 7999,
    rating: 4.8,
    reviewsCount: 215,
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=800&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1689147782410-8630824fffa6?q=80&w=800&auto=format&fit=crop",
    badge: "Party Ready",
    shades: ["Natural Black", "Dark Chocolate", "Burgundy Wine", "Warm Hazelnut"],
    lengths: ["18 inch", "22 inch", "26 inch"],
    description:
      "Wrap and secure in 60 seconds with our built-in comb and velcro wrap strand. Gives that supermodel snatched ponytail look.",
    density: "120g Heavy Volume",
    gender: "women",
  },
  {
    id: "men-crown-patch",
    name: "Men's Silk Crown Patch / Mini Topper",
    category: "men",
    subCategory: "Targeted Crown Balding Solution",
    price: 12999,
    originalPrice: 15499,
    rating: 4.8,
    reviewsCount: 96,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1671718648175-6acd829ac78c?q=80&w=800&auto=format&fit=crop",
    badge: "Clip or Tape Ready",
    shades: ["Natural Black", "Dark Brown", "Salt & Pepper"],
    lengths: ["5-6 inch"],
    description:
      "Lightweight clip-on or tape-on crown patch specially designed to cover male crown vertex thinning in seconds.",
    density: "100% Natural Density",
    baseSize: "4x4 inch Silk Base",
    gender: "men",
  },
  {
    id: "clip-in-caramel-streaks",
    name: "Balayage Color Highlights (Pair of 2)",
    category: "color",
    subCategory: "Zero Bleach Chemical-Free Highlights",
    price: 1999,
    originalPrice: 2499,
    rating: 4.9,
    reviewsCount: 680,
    image: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?q=80&w=800&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1584339312444-6952d098e152?q=80&w=800&auto=format&fit=crop",
    badge: "Viral TikTok Hit",
    shades: ["Caramel Blonde", "Cherry Red", "Platinum Ice", "Rose Gold", "Honey Copper"],
    lengths: ["18 inch", "22 inch"],
    description:
      "Get salon-grade balayage highlights instantly without exposing your natural hair to harsh chemicals, bleaching, or salon damage.",
    density: "2 Piece Duo Clip Set",
    gender: "women",
  },
];

// No verified before/after gallery images could be retrieved from nishhair.com
// (the /before-after page failed to load); these three cases keep the
// prototype's placeholder Unsplash imagery. Swap in real before/afters when
// nishhair.com's gallery is accessible.
export const TRANSFORMATION_CASES: TransformationCase[] = [
  {
    id: "case-1",
    title: "Postpartum Crown Thinning Restoration",
    subtitle: "From visible scalp partition to dense, voluminous hair in 45 seconds",
    beforeImg: "https://images.unsplash.com/photo-1704726798726-0a9bf4a71582?q=80&w=800&auto=format&fit=crop",
    afterImg: "https://www.nishhair.com/cdn/shop/products/DIP02962-2_960x_crop_center.webp?v=1673506013",
    productUsed: "Scalp Line Hair Topper - Silk Base",
    timeToApply: "45 Seconds",
    tag: "Crown Thinning",
    customerQuote:
      "After my baby was born, I stopped looking in the mirror because of sudden hair loss. Parul's topper gave me my identity back.",
    customerName: "Ananya Sharma, Mumbai",
  },
  {
    id: "case-2",
    title: "Bridal Dream Length & Cascade Volume",
    subtitle: "Added 8 inches of bouncy Hollywood waves for her wedding reception",
    beforeImg: "https://www.nishhair.com/cdn/shop/files/before_405x564_crop_center.png?v=1673353534",
    afterImg: "https://www.nishhair.com/cdn/shop/files/after_405x563_crop_center.png?v=1673353549",
    productUsed: "Classic 7-Piece Volumizer Set (22\")",
    timeToApply: "2.5 Minutes",
    tag: "Bridal Glam",
    customerQuote:
      "My hairstylist was in shock! She said it was the easiest, highest-quality human hair she had ever pinned on a bride.",
    customerName: "Rhea Mehra, New Delhi",
  },
  {
    id: "case-3",
    title: "Instant Curtain Bangs & Face Framing",
    subtitle: "Zero scissor cuts, 100% instant French chic transformation",
    beforeImg: "https://www.nishhair.com/cdn/shop/files/clip-in_hairline_with_curtain_dark_black..jpg?v=1762872058",
    afterImg: "https://www.nishhair.com/cdn/shop/files/clip-in_hairline_with_curtain_2_dark_black.jpg?v=1762872102",
    productUsed: "Clip-in Hairline with Curtain Bangs",
    timeToApply: "15 Seconds",
    tag: "No-Cut Bangs",
    customerQuote:
      "I always regret cutting bangs because of the grow-out phase. With Nish Hair, I wear bangs on Friday and take them off on Monday!",
    customerName: "Pooja Varma, Bengaluru",
    // The source "before" photo has a small baked-in "BEFORE" label near the
    // top of the frame; crop below it instead of the section's default
    // top-aligned crop (used by the other two cases). 50%/30% was verified
    // (via direct object-position testing against the live image) to fully
    // hide the watermark on both photos while still showing the full face,
    // forehead and hairline for both the before and after shots.
    imgObjectPosition: "object-[50%_30%]",
  },
];

// Real studio addresses, hours and phone numbers confirmed from
// nishhair.com/pages/contact-us on 2026-08-23.
// NOTE: the Store Locator section was removed from the home page (2026-08-24)
// to shorten the page; this data (and StoreLocator.tsx) are kept unused in
// case the section is re-added later.
export const STORE_LOCATIONS: StoreLocation[] = [
  {
    id: "mumbai-andheri",
    name: "Nish Hair Studio - Andheri West",
    city: "Mumbai - Andheri West",
    address: "1st floor, Sai Iconic, opp Kokilaben Hospital, above IDFC Bank, Andheri West, Mumbai",
    timings: "11 AM - 8 PM",
    phone: "+91 82870 93400",
    mapUrl: "https://maps.google.com/?q=Sai+Iconic+Andheri+West+Mumbai+Nish+Hair",
    isFlagship: true,
  },
  {
    id: "mumbai-worli",
    name: "Nish Hair Studio - Worli",
    city: "Mumbai - Worli",
    address: "Shop no. 135A, Atria - The Millennium Mall, Dr Anne Besant Rd, Worli, Mumbai",
    timings: "11 AM - 8 PM",
    phone: "+91 93211 72917",
    mapUrl: "https://maps.google.com/?q=Atria+Mall+Worli+Mumbai+Nish+Hair",
  },
  {
    id: "mumbai-bandra",
    name: "Nish Hair Studio - Bandra West",
    city: "Mumbai - Bandra West",
    address: "Globus Mall, corner of Hill Road, Bandra West, Mumbai",
    timings: "10 AM - 10 PM",
    phone: "+91 72080 04247",
    mapUrl: "https://maps.google.com/?q=Globus+Mall+Bandra+West+Mumbai+Nish+Hair",
  },
  {
    id: "delhi-vasant-kunj",
    name: "Nish Hair Studio - Vasant Kunj",
    city: "New Delhi",
    address: "Ambience Mall, Ground Floor, Vasant Kunj, New Delhi",
    timings: "10 AM - 10 PM",
    phone: "+91 92114 23989",
    mapUrl: "https://maps.google.com/?q=Ambience+Mall+Vasant+Kunj+Delhi+Nish+Hair",
    isFlagship: true,
  },
  {
    id: "hyderabad-banjara-hills",
    name: "Nish Hair Studio - Banjara Hills",
    city: "Hyderabad - Banjara Hills",
    address: "Road No. 36, next to Park Hyatt, Banjara Hills, Hyderabad",
    timings: "10 AM - 10 PM",
    phone: "+91 93902 87430",
    mapUrl: "https://maps.google.com/?q=Banjara+Hills+Hyderabad+Nish+Hair",
  },
  {
    id: "bangalore-lavelle-road",
    name: "Nish Hair Studio - Lavelle Road",
    city: "Bengaluru",
    address: "No. 25/5, Lavelle Road, Bengaluru 560001",
    timings: "11 AM - 7:30 PM",
    phone: "+91 80730 24478",
    mapUrl: "https://maps.google.com/?q=Lavelle+Road+Bangalore+Nish+Hair",
  },
  {
    id: "pune-koregaon-park",
    name: "Nish Hair Studio - Koregaon Park",
    city: "Pune",
    address: "KOPA Mall, First Floor, Mundhwa Road, Koregaon Park, Pune",
    timings: "10 AM - 10 PM",
    phone: "+91 84828 26435",
    mapUrl: "https://maps.google.com/?q=KOPA+Mall+Koregaon+Park+Pune+Nish+Hair",
  },
  {
    id: "goa-arpora",
    name: "Nish Hair Studio - Arpora",
    city: "Goa",
    address: "Malkin Hostel, House no. 192, Diwan Bhati, Arpora, Goa",
    timings: "4 PM - 8 PM (Closed Tuesdays)",
    phone: "+91 95033 91990",
    mapUrl: "https://maps.google.com/?q=Arpora+Goa+Nish+Hair",
  },
  {
    id: "dubai-al-seef",
    name: "Nish Hair International Lounge - Al Seef",
    city: "Dubai",
    address: "P3-03-2, Building 3, Al Seef Street, Al Hamriya, Dubai, UAE",
    timings: "11 AM - 10 PM",
    phone: "+971 50 490 3681",
    mapUrl: "https://maps.google.com/?q=Al+Seef+Dubai+Nish+Hair",
  },
];

export const ARTICLES: JournalArticle[] = [
  {
    id: "art-1",
    title: "The Ultimate Guide to Choosing Your First Hair Topper vs. Hair Extensions",
    excerpt:
      "Understand base sizing, silk vs. lace bases, hair loss stages, and how to find the undetectable crown match for your lifestyle.",
    category: "Hair Care & Guides",
    date: "August 18, 2026",
    readTime: "4 MIN READ",
    image: "https://www.nishhair.com/cdn/shop/files/Besthairtopper-Curly-Naturalblack_4.png?v=1785153471",
    author: "Parul Gulati",
  },
  {
    id: "art-2",
    title: "How to Wash, Deep Condition, and Heat-Style 100% Real Human Hair Pieces",
    excerpt:
      "Step-by-step masterclass on sulfate-free washes, heat protectants, detangling brushes, and prolonging your pieces for 3+ years.",
    category: "Maintenance Masterclass",
    date: "August 10, 2026",
    readTime: "6 MIN READ",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=800&auto=format&fit=crop",
    author: "Nish Hair Styling Team",
  },
  {
    id: "art-3",
    title: "Postpartum Hair Loss & Alopecia: Real Women Share Their Confidence Journeys",
    excerpt:
      "Candid stories from our community on dealing with thinning hair, shedding cycles, and emotional healing.",
    category: "Real Stories",
    date: "July 28, 2026",
    readTime: "5 MIN READ",
    image: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?q=80&w=800&auto=format&fit=crop",
    author: "Dr. Neha Verma, Trichologist",
  },
];

// Only verified, real press mentions and partnerships confirmed directly from
// nishhair.com and Parul Gulati's own public statements (sourced 2026-08-24) -
// no fabricated celebrity quotes.
export const CELEBRITY_REVIEWS: CelebrityReview[] = [
  {
    id: "shark-tank",
    name: "Shark Tank India Season 2",
    title: "National Television Feature & Investment Deal",
    quote:
      "\"Being on Shark Tank India season two and pitching Nish Hair to the Sharks is definitely one of the top 3 moments of my life.\"",
    image: "https://www.nishhair.com/cdn/shop/files/WhatsApp_Image_2024-02-13_at_5.56.13_PM_690x902_crop_center.jpg?v=1707827632",
    productLoved: "Parul Gulati, Founder",
    verified: true,
  },
  {
    id: "priyanka-borkar",
    name: "Priyanka Borkar",
    title: "Celebrity hairstylist to Priyanka Chopra, Rashmika Mandanna & Kiara Advani",
    quote:
      "India's first-ever hair extension collection designed with a celebrity hairstylist, built for red-carpet-ready looks in minutes.",
    image: "https://www.nishhair.com/cdn/shop/articles/Priyanka_collection_20x8_crop_center.jpg?v=1716022340",
    productLoved: "Priyanka Borkar x Nish Hair Collection",
    verified: true,
  },
];

export const CUSTOMER_REVIEWS: CustomerTestimonial[] = [
  {
    id: "cr-1",
    name: "Simran Kaur",
    location: "Chandigarh",
    rating: 5,
    image: "https://images.unsplash.com/photo-1536766768598-e09213fdcf22?q=80&w=400&auto=format&fit=crop",
    hairConcern: "PCOS Hair Thinning",
    solution: "Silk Base Topper (Natural Black)",
    review:
      "I suffered from PCOS-induced severe crown balding since 2021. I stopped attending family functions. Nish Hair gave me my smile and dignity back. Thank you Parul!",
    verifiedBuyer: true,
    date: "Verified Buyer · 3 days ago",
  },
  {
    id: "cr-2",
    name: "Divya Nambiar",
    location: "Kochi / Dubai",
    rating: 5,
    image: "https://images.unsplash.com/photo-1725033489648-a819750348eb?q=80&w=400&auto=format&fit=crop",
    hairConcern: "Fine Short Hair & Lack of Volume",
    solution: "7-Set Clip-In 20\" Mocha Brown",
    review:
      "The quality of human hair is extraordinary. It took curling irons, survived monsoon humidity, and washed back to soft perfection like real virgin hair.",
    verifiedBuyer: true,
    date: "Verified Buyer · 1 week ago",
  },
  {
    id: "cr-3",
    name: "Vikram Malhotra",
    location: "New Delhi",
    rating: 5,
    image: "https://images.unsplash.com/photo-1653055645127-54ec96add7b5?q=80&w=400&auto=format&fit=crop",
    hairConcern: "Receding Hairline & Crown Spot",
    solution: "Invisible Lace Front Men's Toupee",
    review:
      "As a man, addressing hair loss felt so awkward until I visited the Nish Hair studio. Super discreet, comfortable, and my colleagues just thought I changed my gym routine!",
    verifiedBuyer: true,
    date: "Verified Buyer · 2 weeks ago",
  },
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "What is your primary hair transformation goal?",
    options: [
      { id: "thinning", label: "Cover Crown Thinning or Widening Part", recommend: "toppers", desc: "Targeted top coverage that mimics scalp" },
      { id: "length-volume", label: "Add Length & Full-Head Thickness", recommend: "extensions", desc: "Seamless clip-in extensions for instant glamour" },
      { id: "bangs", label: "Frame My Face With Bangs (Zero Cuts)", recommend: "bangs", desc: "Clip-in curtain or wispy fringe bangs" },
      { id: "men-coverage", label: "Men's Hair Replacement & Patch", recommend: "men", desc: "Undetectable lace toupees and mini toppers" },
    ],
  },
  {
    id: 2,
    question: "What is your current hair length?",
    options: [
      { id: "short", label: "Above Shoulders (Bob / Lob)", desc: "Needs 12\" to 14\" to blend seamlessly" },
      { id: "medium", label: "Shoulder to Mid-Back", desc: "Perfect for 16\" to 20\" lengths" },
      { id: "long", label: "Past Mid-Back", desc: "Opt for 22\" to 26\" luxury length" },
    ],
  },
  {
    id: 3,
    question: "What is your closest natural hair shade?",
    options: [
      { id: "black", label: "Natural Jet Black (#1 / #1B)", color: "#0F0B08", desc: "" },
      { id: "dark-brown", label: "Dark Chocolate / Espresso (#2 / #3)", color: "#2B1E16", desc: "" },
      { id: "chestnut", label: "Chestnut Brown / Mocha (#4 / #6)", color: "#7C3A1E", desc: "" },
      { id: "highlights", label: "Caramel or Honey Highlights", color: "#C8965A", desc: "" },
    ],
  },
];
