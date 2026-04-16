import Script from "next/script";

/** Tidio or compatible live chat — PDF item 10 “manter o Chat na homepage”. */
export function ChatScript() {
  const key = process.env.NEXT_PUBLIC_TIDIO_PUBLIC_KEY?.trim();
  if (!key) return null;

  return (
    <Script
      src={`https://code.tidio.co/${key}.js`}
      strategy="lazyOnload"
    />
  );
}
