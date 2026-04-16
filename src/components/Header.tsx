"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ChevronDown, Globe } from "lucide-react";
import { collections } from "@/lib/data";
import { CartButton } from "@/components/CartButton";
import { Logo } from "@/components/Logo";
import { SocialLinks } from "@/components/SocialLinks";

const navLinks = [
  {
    label: "Equipment Rental",
    labelPt: "Aluguer",
    href: "/collections",
    hasDropdown: true,
  },
  {
    label: "Concierge Services",
    labelPt: "Serviços Concierge",
    href: "/services",
  },
  { label: "How It Works", labelPt: "Como Funciona", href: "/how-it-works" },
  { label: "About", labelPt: "Quem Somos", href: "/about" },
  { label: "Partners", labelPt: "Parceiros", href: "/partners" },
  { label: "Blog", labelPt: "Blogue", href: "/blog" },
  { label: "Contact", labelPt: "Contacto", href: "/contact" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collectionsOpen, setCollectionsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Logo />

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <div key={link.href} className="relative group">
                {link.hasDropdown ? (
                  <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors rounded-lg hover:bg-muted">
                    {link.label}
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <Link
                    href={link.href}
                    className="px-3 py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors rounded-lg hover:bg-muted"
                  >
                    {link.label}
                  </Link>
                )}

                {link.hasDropdown && (
                  <div className="invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200 absolute top-full left-0 mt-1 w-56 bg-white rounded-xl shadow-lg border border-border p-2">
                    <Link
                      href="/collections"
                      className="block px-3 py-2 text-sm font-medium text-primary hover:bg-muted rounded-lg"
                    >
                      All Products
                    </Link>
                    <div className="h-px bg-border my-1" />
                    {collections.map((col) => (
                      <Link
                        key={col.id}
                        href={`/collections/${col.slug}`}
                        className="block px-3 py-2 text-sm text-foreground/80 hover:text-primary hover:bg-muted rounded-lg transition-colors"
                      >
                        {col.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <SocialLinks iconClassName="w-[18px] h-[18px]" />
            <button className="flex items-center gap-1.5 px-3 py-2 text-sm text-foreground/60 hover:text-foreground transition-colors">
              <Globe className="w-4 h-4" />
              <span>EN</span>
            </button>
            <CartButton />
            <Link
              href="/collections"
              className="px-5 py-2.5 bg-primary text-white text-sm font-medium rounded-full hover:bg-primary-light transition-colors"
            >
              Browse & Book
            </Link>
          </div>

          <div className="lg:hidden flex items-center gap-1 sm:gap-2">
            <SocialLinks iconClassName="w-[18px] h-[18px]" />
            <CartButton />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 text-foreground/70"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden border-t border-border bg-white">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <div key={link.href}>
                {link.hasDropdown ? (
                  <>
                    <button
                      onClick={() => setCollectionsOpen(!collectionsOpen)}
                      className="flex items-center justify-between w-full px-3 py-2.5 text-sm font-medium text-foreground/80 hover:text-primary rounded-lg hover:bg-muted"
                    >
                      {link.label}
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${collectionsOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                    {collectionsOpen && (
                      <div className="ml-4 space-y-1">
                        <Link
                          href="/collections"
                          onClick={() => setMobileOpen(false)}
                          className="block px-3 py-2 text-sm font-medium text-primary"
                        >
                          All Products
                        </Link>
                        {collections.map((col) => (
                          <Link
                            key={col.id}
                            href={`/collections/${col.slug}`}
                            onClick={() => setMobileOpen(false)}
                            className="block px-3 py-2 text-sm text-foreground/70 hover:text-primary"
                          >
                            {col.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block px-3 py-2.5 text-sm font-medium text-foreground/80 hover:text-primary rounded-lg hover:bg-muted"
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
            <div className="pt-3 border-t border-border space-y-3">
              <div className="flex justify-center">
                <SocialLinks iconClassName="w-6 h-6" />
              </div>
              <Link
                href="/collections"
                onClick={() => setMobileOpen(false)}
                className="block w-full text-center px-5 py-2.5 bg-primary text-white text-sm font-medium rounded-full hover:bg-primary-light transition-colors"
              >
                Browse & Book
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
