import Image from "next/image";
import Link from "next/link";
import { labels } from "@/content/en/navigation.ts";
import { site } from "@/content/site.ts";
import styles from "./Logo.module.css";

type LogoProps = {
  /** The background the logo sits on. The artwork is never recoloured: a different file is used. */
  background: "light" | "dark";
  /** Fetch the file early. Only for the header's logo, which is above the fold. */
  priority?: boolean;
};

// The files in public/brand/ are the brand's own, unchanged. Both are 993 by 259.8
// units, so at 36 px tall the logo is 138 px wide, above the brand guide's 120 px minimum.
const files = {
  light: "/brand/vegasoft-logo-renkli.svg",
  dark: "/brand/vegasoft-logo-beyaz.svg",
};

export default function Logo({ background, priority = false }: LogoProps) {
  return (
    <Link className={styles.brand} href="/" aria-label={labels.homeLink}>
      <Image
        src={files[background]}
        alt={site.name}
        width={138}
        height={36}
        priority={priority}
      />
    </Link>
  );
}
