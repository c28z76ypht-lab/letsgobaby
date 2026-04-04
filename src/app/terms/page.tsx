export const metadata = {
  title: "Terms & Conditions — Let's go baby®",
  description: "Terms and conditions for Let's go baby equipment rental and concierge services.",
};

export default function TermsPage() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-foreground mb-10">
          Terms & Conditions
        </h1>
        <div className="prose prose-sm max-w-none text-foreground/70 space-y-6">
          <h2 className="text-xl font-semibold text-foreground">1. Rental Agreement</h2>
          <p>
            By placing an order through our website, you agree to rent baby
            equipment from Let&apos;s go baby® (&quot;the Company&quot;) for the
            specified rental period. All products remain the property of the
            Company.
          </p>

          <h2 className="text-xl font-semibold text-foreground">2. Rental Period</h2>
          <p>
            The minimum rental period is 2 days and the maximum is 28 days.
            Extensions may be arranged by contacting us before the scheduled
            pickup date. Late returns without prior arrangement may incur
            additional charges.
          </p>

          <h2 className="text-xl font-semibold text-foreground">3. Delivery & Pickup</h2>
          <p>
            Delivery and pickup are available within our service area (Lisbon,
            Cascais, Sintra, Ericeira, Setúbal and surrounding areas). Delivery
            and pickup locations may differ. Deliveries and pickups between 22:00
            and 06:00 are subject to an additional surcharge.
          </p>

          <h2 className="text-xl font-semibold text-foreground">4. Payment</h2>
          <p>
            Full payment is required at the time of booking. We accept credit
            card and bank transfer. No deposit is charged. Cancellations made
            more than 48 hours before delivery are eligible for a full refund.
          </p>

          <h2 className="text-xl font-semibold text-foreground">5. Product Care</h2>
          <p>
            All products are delivered clean and in good working order. The
            renter is responsible for reasonable care during the rental period.
            Damage beyond normal wear and tear may result in a charge for repair
            or replacement.
          </p>

          <h2 className="text-xl font-semibold text-foreground">6. Liability</h2>
          <p>
            The Company ensures all products meet safety standards and are
            regularly inspected. However, the renter is responsible for using
            products in accordance with the manufacturer&apos;s instructions. The
            Company is not liable for misuse of products.
          </p>

          <h2 className="text-xl font-semibold text-foreground">7. Contact</h2>
          <p>
            For any questions regarding these terms, please contact us at
            hello@letsgobaby.pt.
          </p>
        </div>
      </div>
    </section>
  );
}
