import { Mail, Phone, MapPin, Clock, MessageCircle } from "lucide-react";

export const metadata = {
  title: "Contact — Let's go baby®",
  description:
    "Get in touch with Let's go baby. We're here to help with baby equipment rental and family concierge services in Portugal.",
};

export default function ContactPage() {
  return (
    <>
      <section className="py-20 bg-muted">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-primary uppercase tracking-wider mb-3">
              Contact
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground leading-tight">
              Get in Touch
            </h1>
            <p className="mt-6 text-lg text-foreground/60 leading-relaxed">
              Questions about our products or services? We&apos;re happy to help
              you plan the perfect family trip to Portugal.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-8">
                Send us a message
              </h2>
              <form className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                      Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-xl border border-border bg-white text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                      Email
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 rounded-xl border border-border bg-white text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Subject
                  </label>
                  <select className="w-full px-4 py-3 rounded-xl border border-border bg-white text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary">
                    <option>Equipment Rental</option>
                    <option>Concierge Services</option>
                    <option>Transfers & Car Seats</option>
                    <option>Partnership Enquiry</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Message
                  </label>
                  <textarea
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-white text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                    placeholder="Tell us about your trip — dates, number of children, what you need..."
                  />
                </div>
                <button
                  type="submit"
                  className="px-7 py-3 bg-primary text-white font-medium rounded-full hover:bg-primary-light transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-8">
                Other ways to reach us
              </h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary shrink-0">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">WhatsApp</h3>
                    <p className="text-sm text-foreground/60 mt-1">
                      Our preferred channel — fast replies, usually within minutes.
                    </p>
                    <a
                      href="https://wa.me/351912345678"
                      className="text-sm font-medium text-primary mt-1 inline-block"
                    >
                      Chat on WhatsApp →
                    </a>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Email</h3>
                    <p className="text-sm text-foreground/60 mt-1">
                      For detailed enquiries and proposals.
                    </p>
                    <a
                      href="mailto:hello@letsgobaby.pt"
                      className="text-sm font-medium text-primary mt-1 inline-block"
                    >
                      hello@letsgobaby.pt
                    </a>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Service Area</h3>
                    <p className="text-sm text-foreground/60 mt-1">
                      Lisbon, Cascais, Sintra, Ericeira, Setúbal and surrounding areas. Now expanding to Porto.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary shrink-0">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Response Time</h3>
                    <p className="text-sm text-foreground/60 mt-1">
                      WhatsApp: within minutes during business hours. Email:
                      within 24 hours. Late-night deliveries available with
                      surcharge.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
