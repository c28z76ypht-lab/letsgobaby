import {
  Package,
  Calendar,
  MapPin,
  CreditCard,
  Truck,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "How It Works — Let's go baby®",
  description:
    "Rent baby equipment in 4 simple steps: browse, choose dates, set location, and pay. We deliver to your door in Lisbon and beyond.",
};

const steps = [
  {
    icon: <Package className="w-8 h-8" />,
    number: "01",
    title: "Browse & Select",
    description:
      "Explore 7 categories of top-quality baby equipment — strollers, car seats, cots, highchairs, carriers, bath and safety, and toys. Each product page has detailed specs, age tags, and photos so you know exactly what you're getting.",
  },
  {
    icon: <Calendar className="w-8 h-8" />,
    number: "02",
    title: "Choose Your Dates",
    description:
      "Select your rental period — minimum 2 days, maximum 28 days. Need a longer or shorter rental? Just get in touch and we'll accommodate you. Our calendar shows real-time availability.",
  },
  {
    icon: <MapPin className="w-8 h-8" />,
    number: "03",
    title: "Set Delivery & Pickup",
    description:
      "Tell us where you're staying — hotel, Airbnb, villa, or even the airport. We deliver throughout Lisbon, Cascais, Sintra, Ericeira and surrounding areas. Pickup can be at a different location if needed.",
  },
  {
    icon: <CreditCard className="w-8 h-8" />,
    number: "04",
    title: "Pay & Confirm",
    description:
      "Complete your payment by credit card or bank transfer. No deposit required. You receive instant confirmation and a dedicated WhatsApp contact for any questions before and during your stay.",
  },
];

const perks = [
  "No deposit required",
  "Instant booking confirmation",
  "Free delivery in central Lisbon",
  "Dedicated WhatsApp support",
  "Flexible date changes",
  "Products cleaned & sanitised",
  "Top brands only",
  "Delivery and pickup at different locations",
];

export default function HowItWorksPage() {
  return (
    <>
      <section className="py-20 bg-muted">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-primary uppercase tracking-wider mb-3">
              How It Works
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground leading-tight">
              Rent baby equipment in{" "}
              <span className="text-primary">4 simple steps</span>
            </h1>
            <p className="mt-6 text-lg text-foreground/60 leading-relaxed">
              No stress, no heavy luggage, no hassle. Browse, book, and we
              deliver to your door.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {steps.map((step) => (
              <div key={step.number} className="flex gap-6">
                <div className="shrink-0">
                  <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                    {step.icon}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-bold text-primary/40 uppercase tracking-widest mb-1">
                    Step {step.number}
                  </p>
                  <h2 className="text-xl font-bold text-foreground mb-3">
                    {step.title}
                  </h2>
                  <p className="text-foreground/60 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <Truck className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-bold text-foreground">What&apos;s Included</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {perks.map((perk) => (
              <div
                key={perk}
                className="flex items-center gap-3 bg-white rounded-xl px-4 py-3.5 border border-border"
              >
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                <span className="text-sm font-medium text-foreground">
                  {perk}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-primary-dark text-white text-center">
        <div className="mx-auto max-w-2xl px-4">
          <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-white/70 mb-8">
            Browse our catalogue and book in minutes.
          </p>
          <Link
            href="/collections"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-accent text-primary-dark font-semibold rounded-full hover:bg-accent-light transition-colors"
          >
            Browse Equipment
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
