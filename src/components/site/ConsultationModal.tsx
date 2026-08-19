import { X } from "lucide-react";
import { useState, type FormEvent, useEffect } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  preferredStyle?: string;
  onSubmitSuccess: () => void;
}

export function ConsultationModal({ isOpen, onClose, preferredStyle = "", onSubmitSuccess }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [style, setStyle] = useState(preferredStyle);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Sync preferred style prop when modal opens
  useEffect(() => {
    if (isOpen) {
      setStyle(preferredStyle);
    }
  }, [isOpen, preferredStyle]);

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setName("");
      setEmail("");
      setMessage("");
      onSubmitSuccess();
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-espresso/45 backdrop-blur-sm transition-opacity duration-300">
      <div 
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="relative w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-lift)] animate-rise"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 rounded-full p-1.5 text-muted-foreground hover:bg-sand hover:text-espresso transition-colors"
          aria-label="Close dialog"
        >
          <X className="size-5" />
        </button>

        <h3 id="modal-title" className="font-serif text-2xl text-espresso pr-8">
          Let's Find Your Perfect Look
        </h3>
        <p className="mt-2 text-xs text-muted-foreground">
          Schedule a brief virtual review with our premium stylist team.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="consult-name" className="block text-xs font-medium text-espresso">
              Name
            </label>
            <input
              id="consult-name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-espresso outline-none focus:border-champagne focus:ring-1 focus:ring-champagne"
              placeholder="Your name"
            />
          </div>

          <div>
            <label htmlFor="consult-email" className="block text-xs font-medium text-espresso">
              Email
            </label>
            <input
              id="consult-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-espresso outline-none focus:border-champagne focus:ring-1 focus:ring-champagne"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="consult-style" className="block text-xs font-medium text-espresso">
              Preferred Style
            </label>
            <input
              id="consult-style"
              type="text"
              required
              value={style}
              onChange={(e) => setStyle(e.target.value)}
              className="mt-1 block w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-espresso outline-none focus:border-champagne focus:ring-1 focus:ring-champagne"
              placeholder="e.g. Signature Waves"
            />
          </div>

          <div>
            <label htmlFor="consult-message" className="block text-xs font-medium text-espresso">
              Optional Message
            </label>
            <textarea
              id="consult-message"
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="mt-1 block w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-espresso outline-none focus:border-champagne focus:ring-1 focus:ring-champagne resize-none"
              placeholder="Tell us about your hair type or styling goals..."
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-base btn-primary w-full mt-2"
          >
            {loading ? "Requesting..." : "Request Consultation"}
          </button>
        </form>
      </div>
    </div>
  );
}
