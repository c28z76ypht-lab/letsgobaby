import { Award, ExternalLink, Trophy } from "lucide-react";

export const metadata = {
  title: "Awards & Media — Let's go baby®",
  description:
    "Our awards and media features. Three-time winner of LuxLife's Best Family Concierge Service in Portugal.",
};

const awards = [
  {
    title: "Best Family Concierge Service 2024 — Portugal",
    org: "LuxLife Parent & Baby Awards",
    year: "2024",
    description:
      "Third consecutive year winning this prestigious award, highlighting our commitment to providing top-notch baby gear rentals and family services.",
    links: [
      {
        label: "Official press release",
        url: "https://lux-life.digital/luxlife-magazine-announces-the-winners-of-the-parent-baby-awards-2024/",
      },
      {
        label: "Award page",
        url: "https://lux-life.digital/winners/lets-go-baby-3/",
      },
    ],
  },
  {
    title: "Best Family Concierge Service 2023 — Portugal",
    org: "LuxLife Parent & Baby Awards",
    year: "2023",
    description:
      "Second year recognised for excellence in family travel services in Portugal.",
    links: [],
  },
  {
    title: "Best Family Concierge Service 2022 — Portugal",
    org: "LuxLife Parent & Baby Awards",
    year: "2022",
    description:
      "Our first LuxLife award, recognising the quality of our baby equipment rental and concierge services.",
    links: [],
  },
  {
    title: "Tourism Explorers 2020 — Regional Winner",
    org: "Fábrica de Startups / IPS",
    year: "2020",
    description:
      "Winner of the Setúbal regional final of Tourism Explorers, competing in the national final as one of 12 startups.",
    links: [],
  },
];

const mediaFeatures = [
  "NiT",
  "Observador",
  "SIC Notícias",
  "TimeOut Lisboa",
  "Público",
  "Dinheiro Vivo",
];

export default function AwardsPage() {
  return (
    <>
      <section className="py-20 bg-muted">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-primary uppercase tracking-wider mb-3">
              Awards & Media
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground leading-tight">
              Recognition & Press
            </h1>
            <p className="mt-6 text-lg text-foreground/60 leading-relaxed">
              We&apos;re proud to be recognised as a leading family concierge
              service in Portugal.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-foreground mb-10 flex items-center gap-2">
            <Trophy className="w-6 h-6 text-accent" />
            Awards
          </h2>
          <div className="space-y-8">
            {awards.map((award) => (
              <div
                key={award.title}
                className="bg-muted rounded-2xl p-6 border border-border"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold text-accent uppercase tracking-wider mb-1">
                      {award.year}
                    </p>
                    <h3 className="text-lg font-semibold text-foreground">
                      {award.title}
                    </h3>
                    <p className="text-sm text-primary font-medium mt-0.5">
                      {award.org}
                    </p>
                  </div>
                  <Award className="w-8 h-8 text-accent shrink-0" />
                </div>
                <p className="text-sm text-foreground/60 leading-relaxed mt-3">
                  {award.description}
                </p>
                {award.links.length > 0 && (
                  <div className="flex gap-4 mt-4">
                    {award.links.map((link) => (
                      <a
                        key={link.label}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:text-primary-light"
                      >
                        {link.label}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-8">
            As Featured In
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {mediaFeatures.map((name) => (
              <div
                key={name}
                className="text-xl font-bold text-foreground/30 hover:text-foreground/60 transition-colors cursor-default"
              >
                {name}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
