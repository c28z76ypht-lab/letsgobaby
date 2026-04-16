import Link from "next/link";
import {
  ArrowRight,
  Star,
  Package,
  Calendar,
  MapPin,
  CreditCard,
  Car,
  Map,
  Headset,
  Heart,
  Luggage,
  Sparkles,
  Award,
  Quote,
} from "lucide-react";
import { collections, reviews, conciergeServices } from "@/lib/data";
import { getHomeBanner } from "@/lib/home-banner";
import { HomeBanner } from "@/components/HomeBanner";

const serviceIcons: Record<string, React.ReactNode> = {
  car: <Car className="w-6 h-6" />,
  map: <Map className="w-6 h-6" />,
  headset: <Headset className="w-6 h-6" />,
  heart: <Heart className="w-6 h-6" />,
  luggage: <Luggage className="w-6 h-6" />,
  sparkles: <Sparkles className="w-6 h-6" />,
};

const steps = [
  {
    icon: <Package className="w-7 h-7" />,
    title: "Browse & Select",
    description: "Choose from 7 categories of top-quality baby equipment.",
  },
  {
    icon: <Calendar className="w-7 h-7" />,
    title: "Choose Dates",
    description: "Select your rental period — 2 to 28 days.",
  },
  {
    icon: <MapPin className="w-7 h-7" />,
    title: "Set Location",
    description: "We deliver to your hotel, Airbnb or airport in Lisbon & beyond.",
  },
  {
    icon: <CreditCard className="w-7 h-7" />,
    title: "Pay & Confirm",
    description: "No deposit. Instant confirmation. Credit card or bank transfer.",
  },
];

export default async function Home() {
  const homeBanner = await getHomeBanner();

  return (
    <>
      {homeBanner ? <HomeBanner {...homeBanner} /> : null}
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary-dark via-primary to-primary-light text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/hero-pattern.svg')] opacity-5" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28 relative">
          <div className="max-w-2xl">
            <p className="text-accent-light font-medium text-sm uppercase tracking-wider mb-4">
              Award-winning family concierge service
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
              Travel light.{" "}
              <span className="text-accent-light">We bring the essentials.</span>
            </h1>
            <p className="mt-6 text-lg text-white/80 leading-relaxed max-w-xl">
              Baby equipment rental and family concierge service in Portugal.
              Strollers, car seats, cots and more — delivered to your door in
              Lisbon, Cascais, Sintra and Porto.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link
                href="/collections"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white text-primary-dark font-semibold rounded-full hover:bg-accent-light transition-colors"
              >
                Browse Equipment
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border-2 border-white/30 text-white font-medium rounded-full hover:bg-white/10 transition-colors"
              >
                Concierge Services
              </Link>
            </div>
            <div className="mt-10 flex items-center gap-6 text-sm text-white/60">
              <div className="flex items-center gap-1.5">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-accent-light fill-accent-light" />
                  ))}
                </div>
                <span>5.0 on Trustpilot</span>
              </div>
              <span className="hidden sm:inline">•</span>
              <span className="hidden sm:inline">500+ happy families</span>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-muted">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              How It Works
            </h2>
            <p className="mt-3 text-foreground/60 max-w-md mx-auto">
              Four simple steps to stress-free family travel.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <div key={i} className="text-center group">
                <div className="mx-auto w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-primary mb-5 group-hover:bg-primary group-hover:text-white transition-colors">
                  {step.icon}
                </div>
                <div className="text-xs font-bold text-primary/40 uppercase tracking-widest mb-2">
                  Step {i + 1}
                </div>
                <h3 className="font-semibold text-lg text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-foreground/60 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Collections */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                Baby Equipment Rental
              </h2>
              <p className="mt-3 text-foreground/60">
                Top-quality products from trusted brands, cleaned and ready for your family.
              </p>
            </div>
            <Link
              href="/collections"
              className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary-light transition-colors"
            >
              View all products
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {collections.map((col) => (
              <Link
                key={col.id}
                href={`/collections/${col.slug}`}
                className="group relative bg-muted rounded-2xl overflow-hidden aspect-[4/3] flex items-end hover:shadow-lg transition-shadow"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent z-10" />
                <div className="absolute inset-0 bg-primary/10" />
                <div className="relative z-20 p-4 w-full">
                  <h3 className="font-semibold text-white text-sm sm:text-base">
                    {col.name}
                  </h3>
                  <p className="text-white/70 text-xs mt-0.5">
                    {col.productCount} products
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-6 sm:hidden text-center">
            <Link
              href="/collections"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-primary"
            >
              View all products
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Concierge Services */}
      <section className="py-20 bg-muted">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              Family Concierge Services
            </h2>
            <p className="mt-3 text-foreground/60 max-w-lg mx-auto">
              Beyond equipment — we arrange transfers, tours, babysitters and more
              so you can enjoy Portugal stress-free.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {conciergeServices.map((service) => (
              <Link
                key={service.id}
                href="/services"
                className="group bg-white rounded-2xl p-6 hover:shadow-lg transition-all border border-border hover:border-primary/20"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                  {serviceIcons[service.icon]}
                </div>
                <h3 className="font-semibold text-foreground mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-foreground/60 leading-relaxed">
                  {service.description}
                </p>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-7 py-3 bg-primary text-white font-medium rounded-full hover:bg-primary-light transition-colors"
            >
              Request a Proposal
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-accent fill-accent" />
              ))}
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              What Families Say
            </h2>
            <p className="mt-3 text-foreground/60">
              Trusted by 500+ families from around the world.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review, i) => (
              <div
                key={i}
                className="bg-muted rounded-2xl p-6 relative"
              >
                <Quote className="w-8 h-8 text-primary/10 absolute top-5 right-5" />
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-3.5 h-3.5 text-accent fill-accent" />
                  ))}
                </div>
                <p className="text-sm text-foreground/70 leading-relaxed mb-4">
                  &ldquo;{review.text}&rdquo;
                </p>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary text-xs font-bold">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {review.name}
                    </p>
                    <p className="text-xs text-foreground/50">{review.country}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards & Media */}
      <section className="py-16 bg-muted border-y border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-accent/20 rounded-full text-accent text-xs font-medium mb-4">
                <Award className="w-3.5 h-3.5" />
                Award-Winning Service
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
                Best Family Concierge Service 2024 — Portugal
              </h2>
              <p className="text-foreground/60 text-sm leading-relaxed mb-4">
                Proud winners of LuxLife&apos;s Parent & Baby Award for the third
                consecutive year. Recognized for top-notch baby gear rentals and
                family services in Portugal.
              </p>
              <Link
                href="/awards"
                className="text-sm font-medium text-primary hover:text-primary-light transition-colors"
              >
                See all awards & media features →
              </Link>
            </div>
            <div className="lg:w-1/2">
              <p className="text-xs uppercase tracking-wider text-foreground/40 font-medium mb-4 text-center">
                As featured in
              </p>
              <div className="flex flex-wrap items-center justify-center gap-8 opacity-40">
                {["NiT", "Observador", "SIC", "TimeOut", "Público"].map(
                  (name) => (
                    <div
                      key={name}
                      className="text-lg font-bold text-foreground/60"
                    >
                      {name}
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Top FAQs */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground text-center mb-10">
              Quick Answers
            </h2>
            <div className="space-y-4">
              {[
                {
                  q: "How does the rental process work?",
                  a: "Browse our products, select your dates (2–28 days), choose delivery and pickup location, and pay. We deliver directly to your accommodation.",
                },
                {
                  q: "What areas do you deliver to?",
                  a: "We deliver throughout the Lisbon metropolitan area — Lisbon, Cascais, Sintra, Ericeira, Setúbal and surrounding areas. Now expanding to Porto!",
                },
                {
                  q: "Do I need to pay a deposit?",
                  a: "No. You pay only the rental amount at checkout and receive instant confirmation. No deposit required.",
                },
              ].map((faq, i) => (
                <details
                  key={i}
                  className="group bg-muted rounded-xl p-5 cursor-pointer"
                >
                  <summary className="flex items-center justify-between font-medium text-foreground list-none">
                    {faq.q}
                    <span className="ml-4 text-primary/40 group-open:rotate-45 transition-transform text-xl">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-sm text-foreground/60 leading-relaxed">
                    {faq.a}
                  </p>
                </details>
              ))}
            </div>
            <div className="text-center mt-6">
              <Link
                href="/faqs"
                className="text-sm font-medium text-primary hover:text-primary-light"
              >
                See all FAQs →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary-dark text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready for a stress-free family holiday?
          </h2>
          <p className="text-white/70 mb-8 max-w-md mx-auto">
            Browse our equipment, pick your dates and let us handle the rest.
            Free delivery included in Lisbon.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/collections"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-accent text-primary-dark font-semibold rounded-full hover:bg-accent-light transition-colors"
            >
              Browse Equipment
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 border-2 border-white/30 text-white font-medium rounded-full hover:bg-white/10 transition-colors"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
