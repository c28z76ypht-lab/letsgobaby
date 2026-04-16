import Link from "next/link";
import { MapPin, Mail, Phone } from "lucide-react";
import { Logo } from "@/components/Logo";
import { SocialLinksLight } from "@/components/SocialLinks";

export type FooterEquipmentLink = { name: string; slug: string };

export function Footer({
  equipmentLinks = [],
}: {
  equipmentLinks?: FooterEquipmentLink[];
}) {
  return (
    <footer className="bg-primary-dark text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="mb-4">
              <Logo variant="light" />
            </div>
            <p className="text-white/70 text-sm leading-relaxed mb-4">
              Family concierge service in Portugal. Baby equipment rental,
              transfers, tours and more — everything your family needs for a
              stress-free holiday.
            </p>
            <div className="flex items-center gap-2 text-sm text-white/60">
              <MapPin className="w-4 h-4 shrink-0" />
              <span>Lisbon, Cascais, Sintra & Porto</span>
            </div>
            <div className="mt-5">
              <p className="text-xs text-white/50 uppercase tracking-wider mb-2">
                Follow us
              </p>
              <SocialLinksLight iconClassName="w-5 h-5" />
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 text-accent">
              Equipment Rental
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/porto"
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  Porto area rentals
                </Link>
              </li>
              {(equipmentLinks.length > 0
                ? equipmentLinks
                : [
                    { name: "Strollers", slug: "strollers" },
                    { name: "Car Seats", slug: "car-seats" },
                    { name: "Cots & Beds", slug: "cots-beds" },
                  ]
              ).map(({ name, slug }) => (
                <li key={slug}>
                  <Link
                    href={`/collections/${slug}`}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/collections"
                  className="text-sm text-accent-light/90 hover:text-accent-light transition-colors font-medium"
                >
                  All equipment →
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 text-accent">
              Information
            </h4>
            <ul className="space-y-2.5">
              {[
                ["How It Works", "/how-it-works"],
                ["About Us", "/about"],
                ["FAQs", "/faqs"],
                ["Partners", "/partners"],
                ["Blog", "/blog"],
                ["Awards & Media", "/awards"],
                ["Terms & Conditions", "/terms"],
                ["Privacy Policy", "/privacy"],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 text-accent">
              Contact
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:hello@letsgobaby.pt"
                  className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
                >
                  <Mail className="w-4 h-4 shrink-0" />
                  hello@letsgobaby.pt
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/351912345678"
                  className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
                >
                  <Phone className="w-4 h-4 shrink-0" />
                  WhatsApp
                </a>
              </li>
            </ul>
            <div className="mt-6">
              <p className="text-xs text-white/40 mb-2">Award-winning service</p>
              <p className="text-sm text-accent font-medium">
                Best Family Concierge Service 2024 — Portugal
              </p>
              <p className="text-xs text-white/40 mt-1">LuxLife Parent & Baby Awards</p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} Let&apos;s go baby®. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/terms"
              className="text-xs text-white/40 hover:text-white/70 transition-colors"
            >
              Terms
            </Link>
            <Link
              href="/privacy"
              className="text-xs text-white/40 hover:text-white/70 transition-colors"
            >
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
