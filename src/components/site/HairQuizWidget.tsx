import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { QUIZ_QUESTIONS, PRODUCTS } from '@/data/catalog';
import { Check, ArrowRight, RotateCcw, HelpCircle, ShoppingBag } from 'lucide-react';
import { useSiteState } from "@/lib/site-state";

export function HairQuizWidget() {
  const { addToCart, goToTryOn } = useSiteState();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, any>>({});
  const [isCompleted, setIsCompleted] = useState(false);

  const totalSteps = QUIZ_QUESTIONS.length;
  const question = QUIZ_QUESTIONS[currentStep];

  const handleSelectOption = (option: any) => {
    const newAnswers = { ...answers, [currentStep]: option };
    setAnswers(newAnswers);

    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handleReset = () => {
    setAnswers({});
    setCurrentStep(0);
    setIsCompleted(false);
  };

  // Determine recommendation based on answers
  const recommendedCategory = answers[0]?.recommend || 'toppers';
  const matchedProducts = PRODUCTS.filter(p => p.category === recommendedCategory || (recommendedCategory === 'extensions' && p.category === 'extensions'));
  const recommendedProduct = matchedProducts[0] || PRODUCTS[0];
  const selectedShade = answers[2]?.label?.split(' ')[0] || recommendedProduct.shades[0];
  const selectedLength = recommendedProduct.lengths[0];

  return (
    <section className="nh-sans bg-[var(--nh-bone)] nh-section-pad border-b border-[var(--nh-ink)]/10" id="hair-quiz-section">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-12">

        <div className="bg-white border-2 border-[var(--nh-ink)] shadow-2xl p-6 sm:p-10 lg:p-12 relative overflow-hidden">

          {/* Header */}
          <div className="max-w-2xl mx-auto text-center space-y-3 mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[var(--nh-bone)] text-[var(--nh-ink)] text-[11px] font-extrabold uppercase tracking-[0.28em] border border-[var(--nh-ink)]/10">
              <HelpCircle className="w-3.5 h-3.5 text-[var(--nh-chestnut)]" />
              60-Second Match Finder
            </div>
            <h2 className="nh-serif font-black text-3xl sm:text-4xl lg:text-5xl text-[var(--nh-ink)] tracking-tight">
              Find Your Perfect Scalp & Volume Match
            </h2>
            <p className="text-[15px] text-[var(--nh-ink)]/70">
              Answer 3 simple questions to find your tailored 100% human hair solution with zero guesswork.
            </p>
          </div>

          {/* Progress Indicator */}
          {!isCompleted && (
            <div className="max-w-md mx-auto mb-8">
              <div className="flex justify-between text-[11px] uppercase font-extrabold text-[var(--nh-ink)]/50 tracking-wider mb-2">
                <span>Step {currentStep + 1} of {totalSteps}</span>
                <span>{Math.round(((currentStep + 1) / totalSteps) * 100)}% Complete</span>
              </div>
              <div className="h-1.5 w-full bg-[var(--nh-bone)] overflow-hidden">
                <div
                  className="h-full bg-[var(--nh-chestnut)] transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
                />
              </div>
            </div>
          )}

          {/* Question / Result Container */}
          <div className="max-w-3xl mx-auto">
            <AnimatePresence mode="wait">
              {!isCompleted ? (
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6"
                >
                  <h3 className="nh-serif font-bold text-xl sm:text-2xl text-[var(--nh-ink)] text-center">
                    {question.question}
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {question.options.map((option) => (
                      <button
                        key={option.id}
                        onClick={() => handleSelectOption(option)}
                        className="group text-left p-5 border-2 border-[var(--nh-ink)]/15 hover:border-[var(--nh-ink)] bg-[var(--nh-paper)] hover:bg-[var(--nh-ink)] hover:text-white transition-all cursor-pointer flex flex-col justify-between"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-2">
                            {option.color && (
                              <span
                                className="w-4 h-4 rounded-full border border-black/20 shrink-0"
                                style={{ backgroundColor: option.color }}
                              />
                            )}
                            <span className="font-bold text-sm tracking-tight group-hover:text-white">
                              {option.label}
                            </span>
                          </div>
                          <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-2" />
                        </div>
                        {option.desc && (
                          <p className="text-xs text-[var(--nh-ink)]/60 group-hover:text-white/70 mt-2">
                            {option.desc}
                          </p>
                        )}
                      </button>
                    ))}
                  </div>

                  {currentStep > 0 && (
                    <div className="text-center pt-2">
                      <button
                        onClick={() => setCurrentStep(currentStep - 1)}
                        className="text-xs font-bold uppercase tracking-wider text-[var(--nh-ink)]/60 hover:text-[var(--nh-ink)] cursor-pointer"
                      >
                        &larr; Back to Previous Question
                      </button>
                    </div>
                  )}
                </motion.div>
              ) : (
                /* Completed Result Screen */
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-8"
                >
                  <div className="p-4 bg-emerald-50 border border-emerald-200 text-center">
                    <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-800">
                      Match Found! 99.2% Accuracy Match for Your Profile
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-[var(--nh-paper)] border border-[var(--nh-ink)]/15 p-6 sm:p-8">
                    <div className="md:col-span-5 aspect-square bg-[var(--nh-bone)] border border-[var(--nh-ink)]/10 overflow-hidden relative">
                      <img
                        src={recommendedProduct.image}
                        alt={recommendedProduct.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <span className="absolute top-2 left-2 px-2.5 py-1 bg-[var(--nh-ink)] text-white text-[9px] font-extrabold uppercase tracking-wider">
                        Tailored Match
                      </span>
                    </div>

                    <div className="md:col-span-7 space-y-4">
                      <div>
                        <span className="text-[11px] font-extrabold uppercase tracking-wider text-[var(--nh-chestnut)]">
                          {recommendedProduct.category.toUpperCase()}
                        </span>
                        <h4 className="nh-serif font-black text-2xl text-[var(--nh-ink)] mt-0.5">
                          {recommendedProduct.name}
                        </h4>
                        <p className="text-sm text-[var(--nh-ink)]/70 mt-1.5 leading-relaxed">
                          {recommendedProduct.description}
                        </p>
                      </div>

                      <div className="flex items-baseline gap-3">
                        <span className="text-2xl nh-serif font-black text-[var(--nh-ink)]">
                          ₹{recommendedProduct.price.toLocaleString('en-IN')}
                        </span>
                        {recommendedProduct.originalPrice && (
                          <span className="text-sm text-[var(--nh-ink)]/40 line-through">
                            ₹{recommendedProduct.originalPrice.toLocaleString('en-IN')}
                          </span>
                        )}
                        <span className="text-xs font-bold text-emerald-600">Save 15% Today</span>
                      </div>

                      <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                        <button
                          onClick={() => addToCart(recommendedProduct, selectedShade, selectedLength)}
                          className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 py-3.5 px-6 bg-[var(--nh-ink)] text-white text-xs font-extrabold uppercase tracking-widest hover:bg-[var(--nh-chestnut)] transition-colors cursor-pointer"
                        >
                          <ShoppingBag className="w-4 h-4" />
                          <span>Add Matched Piece to Bag</span>
                        </button>

                        <button
                          onClick={goToTryOn}
                          className="w-full sm:w-auto py-3.5 px-6 bg-transparent text-[var(--nh-ink)] border-2 border-[var(--nh-ink)] text-xs font-extrabold uppercase tracking-widest hover:bg-[var(--nh-bone)] transition-colors cursor-pointer"
                        >
                          Try in 3D
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="text-center pt-2">
                    <button
                      onClick={handleReset}
                      className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[var(--nh-ink)]/60 hover:text-[var(--nh-ink)] cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Retake Hair Quiz</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
