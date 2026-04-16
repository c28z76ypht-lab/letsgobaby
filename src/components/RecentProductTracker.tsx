"use client";

import { useEffect } from "react";
import { rememberRecentProduct } from "@/lib/recent-products";

export function RecentProductTracker({
  slug,
  name,
  image,
}: {
  slug: string;
  name: string;
  image: string;
}) {
  useEffect(() => {
    rememberRecentProduct({ slug, name, image });
  }, [slug, name, image]);

  return null;
}
