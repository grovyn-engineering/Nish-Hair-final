import { useState } from "react";
import { STORE_LOCATIONS } from "@/data/catalog";
import { MapPin, Phone, Clock, Navigation, ExternalLink } from "lucide-react";

export function StoreLocator() {
  const [selectedStoreId, setSelectedStoreId] = useState(STORE_LOCATIONS[0].id);
  const selectedStore = STORE_LOCATIONS.find(s => s.id === selectedStoreId) || STORE_LOCATIONS[0];

  return (
    <section className="nh-sans bg-[var(--nh-bone)] nh-section-pad border-b border-[var(--nh-ink)]/10" id="stores-section">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-2">
            <span className="text-[11px] font-extrabold uppercase tracking-[0.28em] text-[var(--nh-chestnut)] block">
              Flagship Experience Hubs
            </span>
            <h2 className="nh-serif font-black text-4xl sm:text-5xl lg:text-6xl text-[var(--nh-ink)] tracking-tight">
              Visit Our Omnichannel Studios
            </h2>
          </div>
          <p className="text-[16px] leading-[1.72] text-[var(--nh-ink)]/70 max-w-md">
            Book a complimentary 1-on-1 private scalp matching consultation with our master stylists in Mumbai, Bangalore, Delhi, Hyderabad, Pune, Goa, and Dubai.
          </p>
        </div>

        {/* Studio Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Store Selection List */}
          <div className="lg:col-span-5 space-y-3 max-h-[580px] overflow-y-auto pr-2">
            {STORE_LOCATIONS.map((store) => (
              <button
                key={store.id}
                onClick={() => setSelectedStoreId(store.id)}
                className={`w-full text-left p-5 border-2 transition-all cursor-pointer ${
                  selectedStoreId === store.id
                    ? 'bg-[var(--nh-ink)] text-white border-[var(--nh-ink)] shadow-md'
                    : 'bg-white text-[var(--nh-ink)] border-[var(--nh-ink)]/15 hover:border-[var(--nh-ink)]'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <MapPin className={`w-4 h-4 ${selectedStoreId === store.id ? 'text-[var(--nh-gold)]' : 'text-[var(--nh-chestnut)]'}`} />
                      <h4 className="nh-serif font-bold text-lg">
                        {store.city}
                      </h4>
                    </div>
                    <p className={`text-xs mt-1 ${selectedStoreId === store.id ? 'text-white/80' : 'text-[var(--nh-ink)]/70'}`}>
                      {store.name}
                    </p>
                  </div>
                  {store.isFlagship && (
                    <span className="px-2 py-0.5 bg-[var(--nh-gold)] text-[var(--nh-ink)] text-[9px] font-extrabold uppercase tracking-wider">
                      Flagship
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Selected Store Highlight Card (Part 8 visual upgrade) */}
          <div className="lg:col-span-7 bg-white border-2 border-[var(--nh-ink)] shadow-2xl overflow-hidden">

            {/* Image or Typographic Card */}
            {selectedStore.image ? (
              <img
                src={selectedStore.image}
                alt={selectedStore.name}
                className="w-full h-64 sm:h-80 object-cover"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-full h-64 sm:h-80 bg-[var(--nh-chestnut)] flex flex-col items-center justify-center p-6 text-center">
                <span className="nh-serif font-black text-5xl sm:text-6xl text-white/90 tracking-tight">
                  {selectedStore.city}
                </span>
                <span className="text-xs uppercase font-extrabold tracking-[0.28em] text-[var(--nh-gold)] mt-2">
                  Experience Lounge & Studio
                </span>
              </div>
            )}

            {/* Store Details & Real Directions */}
            <div className="p-6 sm:p-8 space-y-6">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold uppercase tracking-[0.28em] text-[var(--nh-chestnut)]">
                    Studio Information
                  </span>
                  {selectedStore.isFlagship && (
                    <span className="text-xs font-bold text-emerald-700">Walk-Ins & Appointments Welcome</span>
                  )}
                </div>
                <h3 className="nh-serif font-black text-2xl sm:text-3xl text-[var(--nh-ink)] mt-1">
                  {selectedStore.name}
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1">
                  <span className="font-bold text-[var(--nh-ink)]/60 flex items-center gap-1.5 uppercase tracking-wider text-[10px]">
                    <MapPin className="w-3.5 h-3.5 text-[var(--nh-chestnut)]" />
                    Address:
                  </span>
                  <p className="text-[var(--nh-ink)] leading-relaxed">{selectedStore.address}</p>
                </div>

                <div className="space-y-2">
                  <div>
                    <span className="font-bold text-[var(--nh-ink)]/60 flex items-center gap-1.5 uppercase tracking-wider text-[10px]">
                      <Clock className="w-3.5 h-3.5 text-[var(--nh-chestnut)]" />
                      Opening Hours:
                    </span>
                    <p className="text-[var(--nh-ink)]">{selectedStore.timings}</p>
                  </div>
                  <div>
                    <span className="font-bold text-[var(--nh-ink)]/60 flex items-center gap-1.5 uppercase tracking-wider text-[10px]">
                      <Phone className="w-3.5 h-3.5 text-[var(--nh-chestnut)]" />
                      Phone & Styling Desk:
                    </span>
                    <p className="text-[var(--nh-ink)] font-bold">{selectedStore.phone}</p>
                  </div>
                </div>
              </div>

              {/* Real Get Directions link opening in new tab */}
              <div className="pt-4 border-t border-[var(--nh-ink)]/10 flex flex-col sm:flex-row items-center gap-3">
                <a
                  href={selectedStore.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 py-3.5 px-6 bg-[var(--nh-ink)] text-white text-xs font-extrabold uppercase tracking-widest hover:bg-[var(--nh-chestnut)] transition-colors cursor-pointer"
                >
                  <Navigation className="w-4 h-4 text-[var(--nh-gold)]" />
                  <span>Get Directions on Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5 ml-1 opacity-70" />
                </a>

                <a
                  href={`tel:${selectedStore.phone.replace(/[^0-9+]/g, '')}`}
                  className="w-full sm:w-auto py-3.5 px-6 bg-transparent text-[var(--nh-ink)] border-2 border-[var(--nh-ink)] text-xs font-extrabold uppercase tracking-widest hover:bg-[var(--nh-bone)] transition-colors text-center cursor-pointer"
                >
                  Call Studio
                </a>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
