import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
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

    const { jobId } = body || {};

    if (!jobId) {
      return new Response(
        JSON.stringify({ success: false, error: "Missing required jobId parameter." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const apiKey = Deno.env.get("TRYITON_API_KEY")?.trim();

    // Check if it's a mock job or if API key is not configured/mock
    if (jobId.startsWith("mock_job_") || !apiKey || apiKey === "mock" || apiKey === "demo") {
      console.log(`[try-on-status Edge Function] Processing mock job status for jobId=${jobId}`);
      return new Response(
        JSON.stringify({ success: true, status: "completed", isSample: true, resultImageUrl: "" }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`[try-on-status Edge Function] Polling status for jobId=${jobId}`);

    const response = await fetch(`https://tryiton.now/api/v1/status/${jobId}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
      },
    });

    if (!response.ok) {
      console.error(`[try-on-status Edge Function] Status check failed: HTTP ${response.status}`);
      return new Response(
        JSON.stringify({ success: false, error: "Could not retrieve preview status." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await response.json();
    const providerStatus = data.status;

    console.log(`[try-on-status Edge Function] Job status: jobId=${jobId}, status=${providerStatus}`);

    if (providerStatus === "completed") {
      const outputUrls = data.outputUrls ?? data.output_urls ?? [];
      const resultImageUrl = outputUrls[0] ?? data.resultUrl ?? data.result_url;

      if (!resultImageUrl) {
        console.error("[try-on-status Edge Function] Completed but resultImageUrl is empty:", JSON.stringify(data));
        return new Response(
          JSON.stringify({ success: false, status: "failed", error: "Generation completed but no preview image was returned." }),
          { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      return new Response(
        JSON.stringify({ success: true, status: "completed", resultImageUrl }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (providerStatus === "failed") {
      console.error("[try-on-status Edge Function] Job failed on provider side:", data.error ?? data.message);
      return new Response(
        JSON.stringify({ success: false, status: "failed", error: "We couldn't create your preview." }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // "queued", "processing", etc.
    return new Response(
      JSON.stringify({ success: true, status: "processing" }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error: any) {
    console.error("[try-on-status Edge Function] Catch-all error:", error.message || error);
    return new Response(
      JSON.stringify({ success: false, error: "Could not retrieve preview status." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
