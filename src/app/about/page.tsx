import { Award, Heart, Shield, Users } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "About Us — Let's go baby®",
  description:
    "Learn about Let's go baby — the award-winning family concierge service in Portugal founded by parents, for parents.",
};

const values = [
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Safety First",
    description:
      "Every product is thoroughly inspected, cleaned and sanitised between rentals. We only stock top-quality equipment from trusted brands.",
  },
  {
    icon: <Heart className="w-6 h-6" />,
    title: "Family-Focused",
    description:
      "Founded by parents who understand the challenges of travelling with little ones. We know what you need because we've been there.",
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Personal Service",
    description:
      "You're not a booking number. We provide dedicated support via WhatsApp from your first enquiry to the end of your holiday.",
  },
  {
    icon: <Award className="w-6 h-6" />,
    title: "Award-Winning",
    description:
      "Three-time winner of LuxLife's Best Family Concierge Service in Portugal. Recognized by Tourism Explorers 2020.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="py-20 bg-muted">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-primary uppercase tracking-wider mb-3">
              About Us
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground leading-tight">
              Making family travel in Portugal{" "}
              <span className="text-primary">effortless</span>
            </h1>
            <p className="mt-6 text-lg text-foreground/60 leading-relaxed">
              Let&apos;s go baby was born from a simple idea: families visiting
              Portugal shouldn&apos;t have to worry about dragging heavy
              equipment through airports. We deliver top-quality baby gear
              directly to your accommodation — so you can focus on making
              memories.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">Our Story</h2>
              <div className="space-y-4 text-foreground/60 leading-relaxed">
                <p>
                  What started as a personal frustration — trying to travel to
                  Portugal with a baby and all the gear — quickly became a mission
                  to help other families.
                </p>
                <p>
                  Based in Lisbon, we serve families across the metropolitan area
                  including Cascais, Sintra, Ericeira and Setúbal. We&apos;re now
                  taking baby steps towards Porto, expanding to serve even more
                  families.
                </p>
                <p>
                  We&apos;re proud to have helped 500+ families from more than 30
                  countries enjoy stress-free holidays in Portugal. From a single
                  stroller rental to full concierge packages including transfers,
                  tours and babysitting — we&apos;re here to help.
                </p>
              </div>
            </div>
            <div className="bg-muted rounded-3xl aspect-[4/3] flex items-center justify-center text-foreground/20">
              <p className="text-sm">Photo placeholder</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground text-center mb-14">
            What We Stand For
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v) => (
              <div key={v.title} className="text-center">
                <div className="mx-auto w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-primary mb-4">
                  {v.icon}
                </div>
                <h3 className="font-semibold text-foreground mb-2">{v.title}</h3>
                <p className="text-sm text-foreground/60 leading-relaxed">
                  {v.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-primary-dark text-white text-center">
        <div className="mx-auto max-w-2xl px-4">
          <h2 className="text-3xl font-bold mb-4">
            Let&apos;s make your family trip unforgettable
          </h2>
          <p className="text-white/70 mb-8">
            Browse our equipment or get in touch — we&apos;re happy to help you
            plan.
          </p>
          <Link
            href="/collections"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-accent text-primary-dark font-semibold rounded-full hover:bg-accent-light transition-colors"
          >
            Browse Equipment
          </Link>
        </div>
      </section>
    </>
  );
}
