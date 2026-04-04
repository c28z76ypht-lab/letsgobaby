import Link from "next/link";
import { faqs } from "@/lib/data";

export const metadata = {
  title: "FAQs — Let's go baby®",
  description:
    "Frequently asked questions about baby equipment rental and family concierge services in Portugal.",
};

export default function FAQsPage() {
  return (
    <>
      <section className="py-20 bg-muted">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-primary uppercase tracking-wider mb-3">
              FAQs
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground leading-tight">
              Frequently Asked Questions
            </h1>
            <p className="mt-6 text-lg text-foreground/60 leading-relaxed">
              Everything you need to know about renting baby equipment and our
              concierge services in Portugal.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details
                key={i}
                className="group bg-muted rounded-xl p-5 cursor-pointer"
              >
                <summary className="flex items-center justify-between font-medium text-foreground list-none">
                  {faq.question}
                  <span className="ml-4 text-primary/40 group-open:rotate-45 transition-transform text-xl shrink-0">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm text-foreground/60 leading-relaxed">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>

          <div className="mt-12 text-center bg-muted rounded-2xl p-8">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Still have questions?
            </h3>
            <p className="text-sm text-foreground/60 mb-4">
              We&apos;d love to help. Reach out via WhatsApp or email.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-white text-sm font-medium rounded-full hover:bg-primary-light transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
