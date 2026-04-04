import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";

export const metadata = {
  title: "Blog — Let's go baby®",
  description:
    "Tips, guides and stories about travelling with children in Portugal. Family travel advice from the Let's go baby team.",
};

const posts = [
  {
    slug: "travelling-lisbon-with-baby",
    title: "The Ultimate Guide to Travelling Lisbon with a Baby",
    excerpt:
      "Everything you need to know about navigating Lisbon's hills, cobblestones and neighbourhoods with a baby or toddler.",
    date: "2026-03-15",
    category: "Travel Guide",
    readTime: "8 min read",
  },
  {
    slug: "best-family-beaches-near-lisbon",
    title: "5 Best Family Beaches Near Lisbon",
    excerpt:
      "From Cascais to Costa da Caparica — the best beaches for families with small children, with calm waters and soft sand.",
    date: "2026-02-28",
    category: "Beaches",
    readTime: "5 min read",
  },
  {
    slug: "what-to-pack-family-trip-portugal",
    title: "What to Pack (and What to Leave Behind) for Portugal",
    excerpt:
      "Our checklist for family travel to Portugal. Spoiler: you can leave most baby gear at home.",
    date: "2026-02-10",
    category: "Tips",
    readTime: "4 min read",
  },
  {
    slug: "sintra-with-kids",
    title: "A Family Day Out in Sintra",
    excerpt:
      "Fairy-tale palaces, lush gardens and practical tips for visiting Sintra with young children.",
    date: "2026-01-20",
    category: "Travel Guide",
    readTime: "6 min read",
  },
];

export default function BlogPage() {
  return (
    <>
      <section className="py-20 bg-muted">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-primary uppercase tracking-wider mb-3">
              Blog
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground leading-tight">
              Family Travel Tips & Guides
            </h1>
            <p className="mt-6 text-lg text-foreground/60 leading-relaxed">
              Practical advice, destination guides and stories about
              travelling with children in Portugal.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="group bg-muted rounded-2xl overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="aspect-[16/9] bg-primary/10" />
                <div className="p-6">
                  <div className="flex items-center gap-3 text-xs text-foreground/50 mb-3">
                    <span className="px-2 py-0.5 bg-primary/10 text-primary rounded-full font-medium">
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(post.date).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                    <span>{post.readTime}</span>
                  </div>
                  <h2 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors mb-2">
                    {post.title}
                  </h2>
                  <p className="text-sm text-foreground/60 leading-relaxed mb-4">
                    {post.excerpt}
                  </p>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                    Read more
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
