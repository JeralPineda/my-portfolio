export type SocialIcon = "github" | "linkedin" | "x";

export interface SocialLink {
  label: string;
  href: string;
  icon: SocialIcon;
  external: boolean;
}

export const socialLinks: SocialLink[] = [
  {
    label: "GitHub",
    href: "https://github.com/JeralPineda",
    icon: "github",
    external: true,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/jeral-pineda-426759187/",
    icon: "linkedin",
    external: true,
  },
];
