import type { Metadata } from "next";
import PasswordStrengthChecker from "../../../calculators/PasswordStrengthChecker";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://punit461.github.io/toolzonex';

export const metadata: Metadata = {
  title: "Password Strength Checker - Test Your Security",
  description: "Check the strength of your password instantly in the browser. Learn how to create secure passwords with our free analyzer.",
  keywords: ["password strength checker", "test password security", "secure password analyzer", "is my password strong", "how secure is my password"],
  alternates: { canonical: "/tools/password-strength-checker" },
  openGraph: {
    title: "Password Strength Checker - Test Your Security | ToolZoneX",
    description: "Check the strength of your password instantly in the browser. Learn how to create secure passwords with our free analyzer.",
    url: `${SITE_URL}/tools/password-strength-checker`,
    type: "article",
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Password Strength Checker",
  "description": "Check the strength of your password instantly in the browser.",
  "url": `${SITE_URL}/tools/password-strength-checker`,
  "applicationCategory": "SecurityApplication",
  "operatingSystem": "Web Browser",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "INR" },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolSchema) }}
      />
      <PasswordStrengthChecker />
    </>
  );
}
