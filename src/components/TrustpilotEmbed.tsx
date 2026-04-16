"use client";

import Script from "next/script";

/**
 * Official Trustpilot TrustBox — set IDs from Trustpilot Business account
 * (Integrations → TrustBox). Without both env vars, renders nothing.
 */
export function TrustpilotEmbed({
  className = "",
  styleHeight = "140px",
}: {
  className?: string;
  styleHeight?: string;
}) {
  const bu = process.env.NEXT_PUBLIC_TRUSTPILOT_BUSINESS_UNIT_ID?.trim();
  const template = process.env.NEXT_PUBLIC_TRUSTPILOT_TEMPLATE_ID?.trim();

  if (!bu || !template) return null;

  return (
    <div className={className}>
      <Script
        src="https://widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js"
        strategy="lazyOnload"
      />
      <div
        className="trustpilot-widget"
        data-locale="en-GB"
        data-template-id={template}
        data-businessunit-id={bu}
        data-style-height={styleHeight}
        data-style-width="100%"
        data-theme="light"
      >
        <a
          href="https://www.trustpilot.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Trustpilot
        </a>
      </div>
    </div>
  );
}
