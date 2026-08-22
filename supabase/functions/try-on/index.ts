import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const ALLOWED_HAIRSTYLES = [
  "Clip-in Hairline with Curtain Bangs",
  "Bangs With Scalp Hair Topper",
  "Electric Blue Hair Strand"
];

const ALLOWED_COLORS = [
  "Black",
  "Brunette",
  "Blonde"
];

const ALLOWED_LENGTHS = [
  "12", "14", "16", "12\"", "14\"", "16\""
];

const HAIRSTYLE_PROVIDER_MAP: Record<string, string> = {
  "Clip-in Hairline with Curtain Bangs": "CurtainBangs",
  "Bangs With Scalp Hair Topper": "HairTopper",
  "Electric Blue Hair Strand": "ColorStrand",
};

const COLOR_PROVIDER_MAP: Record<string, string> = {
  "Black": "jet black",
  "Brunette": "dark chocolate brown",
  "Blonde": "honey blonde with golden highlights",
};

serve(async (req) => {
  // Handle CORS preflight request
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    let body: any;
    try {
      body = await req.json();
    } catch {
      return new Response(
        JSON.stringify({ success: false, error: "Invalid JSON request payload." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { image, hairstyle, color, length } = body || {};

    // 1. Required fields check
    if (!image || !hairstyle || !color || !length) {
      return new Response(
        JSON.stringify({ success: false, error: "Missing required try-on information." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // 2. Options allowlist validation
    if (!ALLOWED_HAIRSTYLES.includes(hairstyle)) {
      return new Response(
        JSON.stringify({ success: false, error: "Unsupported hairstyle selected." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!ALLOWED_COLORS.includes(color)) {
      return new Response(
        JSON.stringify({ success: false, error: "Unsupported hair color selected." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!ALLOWED_LENGTHS.includes(String(length))) {
      return new Response(
        JSON.stringify({ success: false, error: "Unsupported length selected." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // 3. Image validation: size and format
    const imageStr = String(image);
    if (imageStr.length < 50) {
      return new Response(
        JSON.stringify({ success: false, error: "Please upload a valid image." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const approxSizeBytes = (imageStr.length * 3) / 4;
    if (approxSizeBytes > 10 * 1024 * 1024) {
      return new Response(
        JSON.stringify({ success: false, error: "Please upload a valid image under 10MB." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const matches = imageStr.match(/^data:(image\/[a-zA-Z+.-]+);base64,/);
    if (!matches) {
      return new Response(
        JSON.stringify({ success: false, error: "Please upload a valid image." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const mimeType = matches[1];
    const allowedMimes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!allowedMimes.includes(mimeType)) {
      return new Response(
        JSON.stringify({ success: false, error: "Please upload a valid image." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // 4. Secret API Key check (with mock fallback)
    const apiKey = Deno.env.get("TRYITON_API_KEY")?.trim();
    if (!apiKey || apiKey === "mock" || apiKey === "demo") {
      console.warn("[try-on Edge Function] TRYITON_API_KEY is missing or set to mock. Returning mock job.");
      const mockJobId = `mock_job_${hairstyle.replace(/\s+/g, "_").toLowerCase()}`;
      return new Response(
        JSON.stringify({ success: true, jobId: mockJobId }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // 5. Map selections to provider specific values
    const haircut = HAIRSTYLE_PROVIDER_MAP[hairstyle];
    const hairColor = COLOR_PROVIDER_MAP[color] || color.toLowerCase();

    console.log(`[try-on Edge Function] Submitting job: haircut=${haircut}, hairColor=${hairColor}`);

    // 6. Submit to TryItOn API
    const response = await fetch("https://tryiton.now/api/v1/tryon/hairstyle", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        face_image: imageStr,
        haircut: haircut,
        hair_color: hairColor,
        num_samples: 1,
      }),
    });

    if (response.status !== 201 && !response.ok) {
      const errText = await response.text().catch(() => "");
      console.error(`[try-on Edge Function] TryItOn submit failed with status ${response.status}:`, errText.slice(0, 300));

      // Gracefully fall back to mock mode if there is an auth issue or credits issue
      if (response.status === 403 || response.status === 401 || response.status === 402) {
        console.warn("[try-on Edge Function] API authentication/credits failed. Falling back to mock job.");
        const mockJobId = `mock_job_${hairstyle.replace(/\s+/g, "_").toLowerCase()}`;
        return new Response(
          JSON.stringify({ success: true, jobId: mockJobId }),
          { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      return new Response(
        JSON.stringify({ success: false, error: "We couldn't create your preview right now. Please try again." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await response.json();
    const jobId = data.jobId ?? data.job_id;

    if (!data.ok || !jobId) {
      console.error("[try-on Edge Function] Response missing ok or jobId:", JSON.stringify(data));
      return new Response(
        JSON.stringify({ success: false, error: "We couldn't create your preview right now. Please try again." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`[try-on Edge Function] Job created successfully: jobId=${jobId}`);
    return new Response(
      JSON.stringify({ success: true, jobId }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error: any) {
    console.error("[try-on Edge Function] Catch-all error:", error.message || error);
    return new Response(
      JSON.stringify({ success: false, error: "We couldn't create your preview right now. Please try again." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
