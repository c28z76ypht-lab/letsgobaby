import Link from "next/link";
import { ExternalLink, Percent, Handshake } from "lucide-react";

export const metadata = {
  title: "Partners — Let's go baby®",
  description:
    "Our trusted partners — hotels, services and brands we recommend for families visiting Portugal.",
};

const partnerCategories = [
  {
    category: "Hotels & Accommodation",
    partners: [
      {
        name: "Martinhal Hotels",
        description:
          "Family-focused luxury hotels in Lisbon, Cascais and the Algarve with kids clubs and baby concierge.",
        url: "#",
        discount: "10% discount for Let's go baby clients",
      },
      {
        name: "Pestana Hotels",
        description:
          "Premium hotels across Portugal with family rooms and baby-friendly amenities.",
        url: "#",
        discount: null,
      },
    ],
  },
  {
    category: "Transport & Transfers",
    partners: [
      {
        name: "Private Transfers",
        description:
          "Airport transfers with car seats fitted, professional drivers who know your destination.",
        url: "#",
        discount: "Included in concierge packages",
      },
    ],
  },
  {
    category: "Family Activities",
    partners: [
      {
        name: "Lisbon Family Tours",
        description:
          "Guided family tours of Lisbon, Sintra and Cascais designed for families with small children.",
        url: "#",
        discount: null,
      },
    ],
  },
];

export default function PartnersPage() {
  return (
    <>
      <section className="py-20 bg-muted">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-primary uppercase tracking-wider mb-3">
              Partners
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground leading-tight">
              Our Trusted Partners
            </h1>
            <p className="mt-6 text-lg text-foreground/60 leading-relaxed">
              We work with the best hotels, services and brands for families in
              Portugal. Many offer exclusive discounts for Let&apos;s go baby
              clients.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {partnerCategories.map((cat) => (
              <div key={cat.category}>
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  {cat.category}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {cat.partners.map((partner) => (
                    <div
                      key={partner.name}
                      className="bg-muted rounded-2xl p-6 border border-border hover:border-primary/20 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-lg font-semibold text-foreground">
                          {partner.name}
                        </h3>
                        <a
                          href={partner.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:text-primary-light transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                      <p className="text-sm text-foreground/60 leading-relaxed mb-3">
                        {partner.description}
                      </p>
                      {partner.discount && (
                        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-accent/20 rounded-full text-xs font-medium text-accent">
                          <Percent className="w-3 h-3" />
                          {partner.discount}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted">
        <div className="mx-auto max-w-2xl px-4 text-center">
          <Handshake className="w-10 h-10 text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-3">
            Become a Partner
          </h2>
          <p className="text-foreground/60 mb-6">
            Are you a hotel, accommodation, activity provider or family-friendly
            brand in Portugal? We&apos;d love to explore a partnership.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-white text-sm font-medium rounded-full hover:bg-primary-light transition-colors"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </>
  );
}
