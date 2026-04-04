import {
  Car,
  Map,
  Headset,
  Heart,
  Luggage,
  Sparkles,
  Send,
} from "lucide-react";
import { conciergeServices } from "@/lib/data";

export const metadata = {
  title: "Concierge Services — Let's go baby®",
  description:
    "Family concierge services in Portugal. Transfers with car seats, private tours, babysitting, luggage storage and more.",
};

const serviceIcons: Record<string, React.ReactNode> = {
  car: <Car className="w-7 h-7" />,
  map: <Map className="w-7 h-7" />,
  headset: <Headset className="w-7 h-7" />,
  heart: <Heart className="w-7 h-7" />,
  luggage: <Luggage className="w-7 h-7" />,
  sparkles: <Sparkles className="w-7 h-7" />,
};

export default function ServicesPage() {
  return (
    <>
      <section className="py-20 bg-muted">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-primary uppercase tracking-wider mb-3">
              Concierge Services
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground leading-tight">
              Family Concierge{" "}
              <span className="text-primary">Services</span>
            </h1>
            <p className="mt-6 text-lg text-foreground/60 leading-relaxed">
              Beyond equipment rental — we arrange transfers with car seats,
              private tours, babysitters, luggage storage and more. Anything
              your family needs for a comfortable stay in Portugal.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {conciergeServices.map((service) => (
              <div
                key={service.id}
                className="bg-muted rounded-2xl p-7 border border-border"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-5">
                  {serviceIcons[service.icon]}
                </div>
                <h2 className="text-xl font-semibold text-foreground mb-3">
                  {service.title}
                </h2>
                <p className="text-sm text-foreground/60 leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Request Proposal Form */}
      <section className="py-20 bg-muted" id="request">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <Send className="w-8 h-8 text-primary mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-foreground">
              Request a Proposal
            </h2>
            <p className="mt-3 text-foreground/60">
              Tell us about your trip and we&apos;ll prepare a personalised proposal.
            </p>
          </div>

          <form className="bg-white rounded-2xl p-8 border border-border space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Name *
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-border bg-white text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-border bg-white text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Arrival Date
                </label>
                <input
                  type="date"
                  className="w-full px-4 py-3 rounded-xl border border-border bg-white text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Departure Date
                </label>
                <input
                  type="date"
                  className="w-full px-4 py-3 rounded-xl border border-border bg-white text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Number of Children & Ages
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 rounded-xl border border-border bg-white text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                placeholder="e.g. 2 children (8 months, 3 years)"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Services Interested In
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  "Airport Transfer",
                  "Private Tour",
                  "Babysitting",
                  "Luggage Storage",
                  "Travel Assistant",
                  "Other",
                ].map((service) => (
                  <label
                    key={service}
                    className="flex items-center gap-2 text-sm text-foreground/70"
                  >
                    <input
                      type="checkbox"
                      className="rounded border-border text-primary focus:ring-primary/20"
                    />
                    {service}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Accommodation Address
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 rounded-xl border border-border bg-white text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                placeholder="Hotel name or address in Lisbon / Cascais / Sintra"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Additional Details
              </label>
              <textarea
                rows={4}
                className="w-full px-4 py-3 rounded-xl border border-border bg-white text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                placeholder="Flight details, time preferences, special requirements..."
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-primary text-white font-medium rounded-full hover:bg-primary-light transition-colors"
            >
              Send Request
            </button>
            <p className="text-xs text-foreground/40 text-center">
              We typically reply within a few hours.
            </p>
          </form>
        </div>
      </section>
    </>
  );
}
