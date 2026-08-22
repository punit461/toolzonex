import type { Metadata } from "next";
import PasswordStrengthChecker from "../../../calculators/PasswordStrengthChecker";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "Password Strength Checker - Test Your Security",
  description: "Check the strength of your password instantly in the browser. Learn how to create secure passwords with our free analyzer.",
  keywords: ["password strength checker", "test password security", "secure password analyzer", "is my password strong", "how secure is my password", "password test strength", "password complexity checker", "password security tester"],
  alternates: { canonical: "/tools/password-strength-checker" },
  openGraph: {
    title: "Password Strength Checker - Test Your Security | ToolZoneX",
    description: "Check the strength of your password instantly in the browser. Learn how to create secure passwords with our free analyzer.",
    url: `${SITE_URL}/tools/password-strength-checker`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
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

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Is my password sent anywhere when I type it?",
      "acceptedAnswer": { "@type": "Answer", "text": "No — the analysis runs entirely in your browser using JavaScript, and your password is never transmitted or stored." }
    },
    {
      "@type": "Question",
      "name": "Is this a real password complexity checker or just a length counter?",
      "acceptedAnswer": { "@type": "Answer", "text": "It's a full password complexity checker — it scores length tiers, character variety (uppercase, lowercase, numbers, symbols), and penalizes passwords made of only letters or only numbers, rather than just counting characters." }
    },
    {
      "@type": "Question",
      "name": "How does this password test strength scoring work?",
      "acceptedAnswer": { "@type": "Answer", "text": "Points are added for length milestones (8+, 12+, 16+ characters) and for including uppercase letters, lowercase letters, numbers, and symbols, then reduced for passwords using only one character type. The total maps to a Very Weak, Weak, Good, or Strong rating shown on the meter." }
    },
    {
      "@type": "Question",
      "name": "Can I trust an online password security tester with my real password?",
      "acceptedAnswer": { "@type": "Answer", "text": "This tester never sends your password over the network or saves it anywhere — the entire check runs client-side in your browser's memory and disappears when you leave the page. Still, as a general rule with any online tool, avoid testing a password you're currently using and change it afterward if you do." }
    },
    {
      "@type": "Question",
      "name": "What makes a password actually strong?",
      "acceptedAnswer": { "@type": "Answer", "text": "Length matters more than complexity tricks — a long passphrase of unrelated words is typically stronger and easier to remember than a short password with substituted symbols. Aim for at least 12-16 characters mixing letter case, numbers, and symbols, and avoid reusing the same password across multiple accounts." }
    }
  ]
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <PasswordStrengthChecker />
    </>
  );
}
