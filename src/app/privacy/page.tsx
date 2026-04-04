export const metadata = {
  title: "Privacy Policy — Let's go baby®",
  description: "Privacy policy for Let's go baby — how we collect, use and protect your personal data.",
};

export default function PrivacyPage() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-foreground mb-10">
          Privacy Policy
        </h1>
        <div className="prose prose-sm max-w-none text-foreground/70 space-y-6">
          <h2 className="text-xl font-semibold text-foreground">1. Information We Collect</h2>
          <p>
            We collect personal information you provide when placing an order,
            including your name, email address, phone number, delivery address
            and payment details. We also collect booking details such as rental
            dates and delivery preferences.
          </p>

          <h2 className="text-xl font-semibold text-foreground">2. How We Use Your Information</h2>
          <p>
            Your information is used to process and deliver your order, communicate
            with you about your booking, improve our services, and comply with
            legal obligations. We do not use your data for marketing newsletters
            unless you explicitly opt in.
          </p>

          <h2 className="text-xl font-semibold text-foreground">3. Data Sharing</h2>
          <p>
            We do not sell your personal data. We may share your delivery
            information with our logistics partners solely for the purpose of
            delivering and collecting equipment. Payment data is processed
            securely through our payment provider.
          </p>

          <h2 className="text-xl font-semibold text-foreground">4. Data Security</h2>
          <p>
            We implement appropriate technical and organisational measures to
            protect your personal data against unauthorised access, loss or
            destruction.
          </p>

          <h2 className="text-xl font-semibold text-foreground">5. Your Rights</h2>
          <p>
            Under GDPR, you have the right to access, correct, delete, or
            restrict processing of your personal data. To exercise these rights,
            contact us at hello@letsgobaby.pt.
          </p>

          <h2 className="text-xl font-semibold text-foreground">6. Cookies</h2>
          <p>
            We use essential cookies to ensure the website functions correctly
            and analytics cookies to understand how visitors use our site. You
            can manage cookie preferences in your browser settings.
          </p>

          <h2 className="text-xl font-semibold text-foreground">7. Contact</h2>
          <p>
            For privacy-related enquiries, contact us at hello@letsgobaby.pt.
          </p>
        </div>
      </div>
    </section>
  );
}
