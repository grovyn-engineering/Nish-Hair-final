import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { ArrowLeft, Sparkles } from "lucide-react";

import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { TryOnHeader } from "@/components/site/TryOnHeader";
import { ProgressSteps } from "@/components/site/ProgressSteps";
import { UploadZone } from "@/components/site/UploadZone";
import { ImagePreview } from "@/components/site/ImagePreview";
import { LookGrid } from "@/components/site/LookGrid";
import { CustomizationPanel } from "@/components/site/CustomizationPanel";
import { ProcessingState } from "@/components/site/ProcessingState";
import { BeforeAfterSlider } from "@/components/site/BeforeAfterSlider";
import { ProductCard } from "@/components/site/ProductCard";
import { AIStylistCard } from "@/components/site/AIStylistCard";
import { ErrorState } from "@/components/site/ErrorState";
import { ConsultationModal } from "@/components/site/ConsultationModal";
import { PhotoValidationError } from "@/components/site/PhotoValidationError";

import { looks, type HairColorName, type HairLength } from "@/data/looks";
import { getProductForLook } from "@/data/products";
import { generateTryOn, checkTryOnStatus } from "@/lib/tryOnService";

const searchSchema = z.object({
  look: z.string().optional(),
});

export const Route = createFileRoute("/try-on")({
  validateSearch: (search) => searchSchema.parse(search),
  component: TryOnStudio,
});

function TryOnStudio() {
  const { look: searchLookId } = Route.useSearch();
  const navigate = useNavigate();

  // State Management
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string | undefined>(undefined);
  const [dimensions, setDimensions] = useState<{ width: number; height: number } | undefined>(undefined);
  const [isLowQuality, setIsLowQuality] = useState(false);

  // Initialize selectedLookId from search params or default to first look
  const [selectedLookId, setSelectedLookId] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<HairColorName>("Brunette");
  const [selectedLength, setSelectedLength] = useState<HairLength>("12\"");

  const [generationStatus, setGenerationStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isSample, setIsSample] = useState(false);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [processingStage, setProcessingStage] = useState(0);
  const [validationError, setValidationError] = useState<{ failures: string[]; reasons: string[] } | null>(null);

  // Action / Consultation states
  const [addedToCart, setAddedToCart] = useState(false);
  const [savedLook, setSavedLook] = useState(false);
  const [requestedConsultation, setRequestedConsultation] = useState(false);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [dynamicStylistNote, setDynamicStylistNote] = useState<string | null>(null);

  // Sync selectedLookId from query parameter look if provided
  useEffect(() => {
    if (searchLookId && looks.some((l) => l.id === searchLookId)) {
      setSelectedLookId(searchLookId);
      setStep(2);
    } else if (!selectedLookId) {
      setSelectedLookId(looks[0].id);
    }
  }, [searchLookId]);

  const selectedLook = looks.find((l) => l.id === selectedLookId) || looks[0];

  // Align length/color constraints when hairstyle changes
  useEffect(() => {
    if (selectedLook) {
      if (!selectedLook.availableLengths.includes(selectedLength)) {
        setSelectedLength(selectedLook.availableLengths[0]);
      }
      if (!selectedLook.availableColors.includes(selectedColor)) {
        setSelectedColor(selectedLook.availableColors[0]);
      }
    }
    // Reset interaction states for new looks
    setAddedToCart(false);
    setSavedLook(false);
    setRequestedConsultation(false);
  }, [selectedLookId]);

  const handleUploadAccepted = (dataUrl: string, fileName: string, dims?: { width: number; height: number }, lowQuality?: boolean) => {
    // Clear any previous validation errors when a new photo is uploaded
    setValidationError(null);
    setUploadedImage(dataUrl);
    setUploadedFileName(fileName);
    setDimensions(dims);
    setIsLowQuality(lowQuality ?? false);
  };

  const handleUploadError = (message: string) => {
    toast.error(message);
  };

  const handleValidationFailure = (failures: string[], reasons: string[]) => {
    setValidationError({ failures, reasons });
    toast.error("Photo validation failed", {
      description: "Please check the errors below and try another photo.",
    });
  };

  const simulateDemoMode = async () => {
    setGenerationStatus("loading");
    setProcessingStage(0);
    setErrorMsg(null);

    // Simulate multi-stage premium loaders (Stage 0 to 3)
    for (let stage = 0; stage <= 3; stage++) {
      setProcessingStage(stage);
      await new Promise((resolve) => setTimeout(resolve, 1500));
    }

    setGeneratedImage(null);
    setIsSample(true); // Demo mode uses look model image
    setGenerationStatus("success");
  };

  const handleTryThisLook = async () => {
    // Complete validation checks
    if (!uploadedImage) {
      toast.error("Please start by uploading your photo.");
      setStep(1);
      return;
    }
    if (!selectedLookId) {
      toast.error("Please choose a hairstyle before continuing.");
      setStep(2);
      return;
    }
    if (!selectedColor) {
      toast.error("Please select a hair color.");
      return;
    }
    if (!selectedLength) {
      toast.error("Please select a length.");
      return;
    }

    setStep(3);
    setGenerationStatus("loading");
    setProcessingStage(0);
    setErrorMsg(null);
    setAddedToCart(false);
    setSavedLook(false);
    setRequestedConsultation(false);

    if (isDemoMode) {
      await simulateDemoMode();
      return;
    }

    try {
      // 1. Submit the job to Supabase Edge Function
      const submitRes = await generateTryOn({
        image: uploadedImage,
        hairstyle: selectedLook.name,
        color: selectedColor,
        length: selectedLength,
      });

      if (!submitRes.success || !submitRes.jobId) {
        setGenerationStatus("error");
        setErrorMsg(submitRes.error || "We couldn't create your preview right now. Please try again.");
        return;
      }

      // ── Fast path: external backend returned image immediately ──────────────
      if (submitRes.resultImageUrl) {
        setProcessingStage(3);
        await new Promise((resolve) => setTimeout(resolve, 800)); // brief UX pause
        setGeneratedImage(submitRes.resultImageUrl);
        setIsSample(false);
        setGenerationStatus("success");
        return;
      }

      const jobId = submitRes.jobId;
      setProcessingStage(1); // Stage 1: Understanding your hair profile

      // 2. Poll for status using the try-on-status Edge Function
      let attempts = 0;
      const maxAttempts = 40; // 40 attempts * 3s = 120s timeout
      let completed = false;

      while (attempts < maxAttempts && !completed) {
        attempts++;
        
        // Wait 3 seconds
        await new Promise((resolve) => setTimeout(resolve, 3000));
        
        // Visual loader progression
        if (attempts === 2) {
          setProcessingStage(2); // Stage 2: Creating your personalized style
        }

        const pollRes = await checkTryOnStatus(jobId);

        if (!pollRes.success || pollRes.status === "failed") {
          completed = true;
          setGenerationStatus("error");
          setErrorMsg(pollRes.error || "We couldn't create your preview right now. Please try again.");
          return;
        }

        if (pollRes.status === "completed") {
          completed = true;
          setProcessingStage(3); // Stage 3: Preparing your preview
          await new Promise((resolve) => setTimeout(resolve, 1000)); // Brief pause for UX

          setGeneratedImage(pollRes.resultImageUrl || null);
          setIsSample(!!pollRes.isSample);
          setGenerationStatus("success");
          return;
        }
      }

      // Timeout check
      if (!completed) {
        setGenerationStatus("error");
        setErrorMsg("Your preview is taking longer than expected. Please try again.");
      }
    } catch (err) {
      console.error("[try-on] handleTryThisLook exception:", err);
      setGenerationStatus("error");
      setErrorMsg("We couldn't create your preview right now. Please try again.");
    }
  };


  const handleApplyStylistPick = () => {
    let recommendedColor: HairColorName = "Brunette";
    let recommendedLength: HairLength = "14\"";

    switch (selectedLook.id) {
      case "curtain-bangs":
        recommendedColor = "Black";
        recommendedLength = "12\"";
        break;
      case "scalp-topper":
        recommendedColor = "Brunette";
        recommendedLength = "14\"";
        break;
      case "electric-blue-strand":
        recommendedColor = "Blonde";
        recommendedLength = "16\"";
        break;
    }

    setSelectedColor(recommendedColor);
    setSelectedLength(recommendedLength);
    toast.success(`Applied AI Stylist Pick: ${recommendedColor} in ${recommendedLength}`);
    
    setTimeout(() => {
      handleTryThisLook();
    }, 500);
  };

  const handleAddToCart = () => {
    setAddedToCart(true);
    toast.success("Added to your NishHair bag", {
      description: `${selectedLook.name} (${selectedLength} · ${selectedColor}) has been added to your shopping bag.`,
    });
  };

  const handleSaveLook = () => {
    setSavedLook(true);
    try {
      const savedList = JSON.parse(localStorage.getItem("nishhair_saved_looks") || "[]");
      const newLook = {
        hairstyle: selectedLook.name,
        color: selectedColor,
        length: selectedLength,
        resultImageUrl: afterSrc,
        createdAt: new Date().toISOString(),
      };
      savedList.push(newLook);
      localStorage.setItem("nishhair_saved_looks", JSON.stringify(savedList));
      toast.success("Your look has been saved.");
    } catch (err) {
      console.error("[try-on] Failed to save look:", err);
      toast.success("Your look has been saved.");
    }
  };

  const handleConsultationSuccess = () => {
    setRequestedConsultation(true);
    toast.success("Thank you — our stylist team will be in touch.");
  };

  const handleResetToLookChoice = () => {
    setStep(2);
    setGenerationStatus("idle");
    setGeneratedImage(null);
    setIsSample(false);
    setDynamicStylistNote(null);
    setErrorMsg(null);
  };

  // Resolve before/after images
  const beforeSrc = uploadedImage || "";
  const afterSrc = isSample ? selectedLook.image : (generatedImage || selectedLook.image);
  const product = getProductForLook(selectedLook.id);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
        {/* Header and Progress Steps */}
        <TryOnHeader />
        
        <div className="mt-8 mx-auto w-full max-w-md">
          <ProgressSteps current={step} />
        </div>

        {/* Step Views */}
        <div className="mt-12">
          {step === 1 && (
            <div className="mx-auto max-w-3xl animate-rise">
              <div className="mb-8 text-center">
                <h2 className="font-serif text-3xl text-espresso">Start With Your Photo</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  For the most realistic preview, use a clear front-facing photo with good lighting.
                </p>
              </div>

              {!uploadedImage ? (
                <div className="space-y-4">
                  {validationError && (
                    <PhotoValidationError
                      failures={validationError.failures}
                      reasons={validationError.reasons}
                      onRetry={() => setValidationError(null)}
                    />
                  )}
                  <UploadZone onAccepted={handleUploadAccepted} onError={handleUploadError} onValidationFailure={handleValidationFailure} enableBackendValidation={true} />
                  <p className="text-center text-xs text-muted-foreground tracking-wide">
                    🔒 Your photo is validated with Velura backend before use.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {validationError && (
                    <PhotoValidationError
                      failures={validationError.failures}
                      reasons={validationError.reasons}
                      onRetry={() => {
                        setValidationError(null);
                        setUploadedImage(null);
                        setDimensions(undefined);
                        setIsLowQuality(false);
                      }}
                    />
                  )}
                  <ImagePreview
                    src={uploadedImage || ""}
                    fileName={uploadedFileName}
                    dimensions={dimensions}
                    isLowQuality={isLowQuality}
                    onChange={() => {
                      setUploadedImage(null);
                      setDimensions(undefined);
                      setIsLowQuality(false);
                      setValidationError(null);
                    }}
                    onContinue={() => setStep(2)}
                  />
                </div>
              )}
            </div>
          )}

          {step === 2 && (
            <div className="grid gap-10 lg:grid-cols-[1fr_360px] animate-rise">
              <div className="space-y-6">
                <div>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-espresso transition-colors mb-4"
                  >
                    <ArrowLeft className="size-4" /> Back to Photo
                  </button>
                  <h2 className="font-serif text-3xl text-espresso">What Would You Like To Try?</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Choose a hairstyle and personalize the look before generating your preview.
                  </p>
                </div>

                <LookGrid
                  looks={looks}
                  selectedId={selectedLookId}
                  ctaLabel="Select Style"
                  onSelect={(look) => setSelectedLookId(look.id)}
                />
              </div>

              <div className="lg:mt-14">
                <CustomizationPanel
                  look={selectedLook}
                  color={selectedColor}
                  length={selectedLength}
                  onColorChange={setSelectedColor}
                  onLengthChange={setSelectedLength}
                  onSubmit={handleTryThisLook}
                  onBack={() => setStep(1)}
                  isLoading={generationStatus === "loading"}
                  isDemoMode={isDemoMode}
                  onDemoModeChange={setIsDemoMode}
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="mx-auto max-w-5xl animate-rise">
              {generationStatus === "loading" && (
                <div className="mx-auto max-w-xl">
                  <ProcessingState stage={processingStage} />
                </div>
              )}

              {generationStatus === "error" && (
                <div className="mx-auto max-w-xl">
                  <ErrorState
                    title="Preview Generation Unsuccessful"
                    message={errorMsg || "We couldn't create your preview this time."}
                    onRetry={handleTryThisLook}
                    onChooseAnother={handleResetToLookChoice}
                  />
                  <div className="mt-6 text-center">
                    <button
                      type="button"
                      onClick={() => {
                        setIsDemoMode(true);
                        // Trigger the demo run immediately
                        setTimeout(() => {
                          setStep(3);
                          setGenerationStatus("loading");
                          setProcessingStage(0);
                          setErrorMsg(null);
                          simulateDemoMode();
                        }, 100);
                      }}
                      className="text-sm font-medium text-champagne hover:text-champagne/80 hover:underline transition-colors"
                    >
                      Want to skip API keys? Try with Demo Mode
                    </button>
                  </div>
                </div>
              )}

              {generationStatus === "success" && (
                <div className="space-y-12">
                  <div className="text-center">
                    <p className="eyebrow inline-flex items-center gap-2">
                      <Sparkles className="size-3.5 text-champagne" /> Ready to View
                    </p>
                    <h2 className="mt-2 font-serif text-3xl text-espresso sm:text-4xl">Your New Look Is Ready</h2>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Drag the slider to compare your original photo with the {selectedLook.name} style.
                    </p>
                  </div>

                  {/* Fallback Warning Box */}
                  {isSample && (
                    <div className="mx-auto max-w-3xl rounded-xl border border-champagne-soft bg-champagne-soft/20 p-5 text-sm text-espresso">
                      <p className="font-serif text-base font-bold text-espresso">Sample Preview Mode</p>
                      <p className="mt-1 leading-relaxed text-muted-foreground">
                        Since the external AI generation API is running in demonstration mode, we've styled the selected{" "}
                        <strong>{selectedLook.name}</strong> on our Look Model. This gives you a clear visual feel of the style, length, and shade.
                      </p>
                    </div>
                  )}

                  {/* Before / After Slider */}
                  <div className="mx-auto max-w-3xl">
                    <BeforeAfterSlider
                      beforeSrc={beforeSrc}
                      afterSrc={afterSrc}
                      afterLabel={isSample ? "Sample Preview" : "AI Preview"}
                    />
                    <div className="mt-4 flex justify-between px-2 text-xs text-muted-foreground">
                      <span>Hairstyle: {selectedLook.name}</span>
                      <span>Configuration: {selectedLength} · {selectedColor}</span>
                    </div>
                  </div>

                  {/* Product Recommendation Card */}
                  {product && (
                    <div className="mx-auto max-w-4xl border-t border-border pt-12">
                      <div className="mb-6 text-center lg:text-left">
                        <p className="eyebrow">Match Your Preview</p>
                        <h3 className="font-serif text-2xl text-espresso">Get the Look</h3>
                      </div>
                      <ProductCard
                        product={product}
                        color={selectedColor}
                        length={selectedLength}
                        added={addedToCart}
                        onAddToCart={handleAddToCart}
                        onSaveLook={handleSaveLook}
                        onConsultation={() => setIsConsultationOpen(true)}
                      />
                    </div>
                  )}

                  {/* Stylist Pick */}
                  {(dynamicStylistNote || selectedLook.stylistNote) && (
                    <div className="mx-auto max-w-4xl">
                      <AIStylistCard
                        note={dynamicStylistNote || selectedLook.stylistNote}
                        onApply={handleApplyStylistPick}
                      />
                    </div>
                  )}

                  {/* Navigation Footer */}
                  <div className="flex flex-col items-center justify-center gap-4 border-t border-border pt-8 sm:flex-row">
                    <button type="button" onClick={handleResetToLookChoice} className="btn-base btn-ghost">
                      Try Another Look
                    </button>
                    <button
                      type="button"
                      onClick={() => navigate({ to: "/" })}
                      className="btn-base btn-ghost"
                    >
                      Return to Homepage
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
      
      {/* Consultation Dialog overlay */}
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
        preferredStyle={`${selectedLook.name} (${selectedLength} · ${selectedColor})`}
        onSubmitSuccess={handleConsultationSuccess}
      />
      
      <Footer />
    </div>
  );
}
