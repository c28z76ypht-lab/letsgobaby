import Link from "next/link";
import Image from "next/image";
import { getSiteLogoUrl } from "@/lib/site";

type LogoProps = {
  className?: string;
  /** Dark header → default (green wordmark). Footer on primary-dark → light. */
  variant?: "default" | "light";
};

export function Logo({ className = "", variant = "default" }: LogoProps) {
  const remoteLogo = getSiteLogoUrl();

  if (remoteLogo) {
    return (
      <Link
        href="/"
        className={`flex items-center shrink-0 ${className}`}
        aria-label="Let's go baby — home"
      >
        <span
          className={
            variant === "light"
              ? "inline-block bg-white rounded-md px-2 py-1.5 shadow-sm"
              : "inline-block"
          }
        >
          <Image
            src={remoteLogo}
            alt="Let's go baby"
            width={200}
            height={40}
            className="h-8 sm:h-9 w-auto max-w-[200px] object-contain object-left"
            priority
          />
        </span>
      </Link>
    );
  }

  const src =
    variant === "light" ? "/images/logo-light.svg" : "/images/logo.svg";

  return (
    <Link
      href="/"
      className={`flex items-center shrink-0 ${className}`}
      aria-label="Let's go baby — home"
    >
      <Image
        src={src}
        alt="Let's go baby"
        width={200}
        height={36}
        className="h-8 sm:h-9 w-auto max-w-[min(200px,55vw)] object-contain object-left"
        priority
      />
    </Link>
  );
}
