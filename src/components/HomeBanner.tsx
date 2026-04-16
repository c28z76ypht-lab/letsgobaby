"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import type { HomeBannerData } from "@/lib/home-banner";

function dismissStorageKey(message: string): string {
  let h = 0;
  for (let i = 0; i < message.length; i++) {
    h = Math.imul(31, h) + message.charCodeAt(i);
  }
  return `lgb-home-banner-${h}`;
}

export function HomeBanner({ message, href, linkLabel }: HomeBannerData) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(dismissStorageKey(message))) {
        setVisible(false);
      }
    } catch {
      /* keep visible */
    }
  }, [message]);

  const dismiss = useCallback(() => {
    try {
      sessionStorage.setItem(dismissStorageKey(message), "1");
    } catch {
      /* private mode */
    }
    setVisible(false);
  }, [message]);

  if (!visible) return null;

  const linkText = linkLabel || "Learn more";
  const isExternal = href?.startsWith("http://") || href?.startsWith("https://");

  return (
    <div className="relative bg-accent-light/30 border-b border-accent/35 text-foreground">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 sm:py-3.5 pr-11 sm:pr-14">
        <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center sm:justify-center gap-2 sm:gap-x-4 text-center sm:text-center text-sm">
          <p className="text-foreground/90 font-medium leading-snug">{message}</p>
          {href &&
            (isExternal ? (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center text-primary hover:text-primary-dark font-semibold underline underline-offset-2 shrink-0"
              >
                {linkText}
              </a>
            ) : (
              <Link
                href={href}
                className="inline-flex items-center justify-center text-primary hover:text-primary-dark font-semibold underline underline-offset-2 shrink-0"
              >
                {linkText}
              </Link>
            ))}
        </div>
      </div>
      <button
        type="button"
        onClick={dismiss}
        className="absolute right-1.5 top-1/2 -translate-y-1/2 p-2 rounded-lg text-foreground/45 hover:text-foreground hover:bg-black/5 transition-colors"
        aria-label="Dismiss announcement"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
