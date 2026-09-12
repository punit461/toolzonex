import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ToolBlogTemplate from "../../../../components/ToolBlogTemplate";
import { allToolBlogs, getAllToolBlogSlugs, getToolBlogBySlug, isToolBlogIndexable } from "../../../../data/tool-blogs";
import { AUTHOR_PERSON_SCHEMA, ORGANIZATION_SAME_AS } from "../../../../data/author";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

const MONTHS: Record<string, string> = {
  january: '01', february: '02', march: '03', april: '04', may: '05', june: '06',
  july: '07', august: '08', september: '09', october: '10', november: '11', december: '12',
};

/** Parses the guide's human-authored "Month Year" date (e.g. "August 2026") into an
 *  ISO date. Falls back to the 1st of the current month if the format is unexpected,
 *  rather than a hardcoded constant shared by every guide regardless of its own date. */
function toIsoDate(monthYear: string): string {
  const [monthName, year] = monthYear.trim().split(/\s+/);
  const month = MONTHS[monthName?.toLowerCase()];
  if (month && year) return `${year}-${month}-01`;
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-01`;
}

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllToolBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const blog = getToolBlogBySlug(slug);
  if (!blog) return {};
  return {
    title: blog.title,
    description: blog.description,
    keywords: blog.keywords,
    alternates: { canonical: `/blog/tools/${blog.slug}` },
    // Guides without proven search demand stay live and linked, but are withheld
    // from the index. `follow` keeps link equity flowing to the tool they describe.
    // Omitted for keepers so the layout's site-wide `index, follow` default applies.
    ...(isToolBlogIndexable(blog.slug) ? {} : { robots: { index: false, follow: true } }),
    openGraph: {
      title: `${blog.title} | ToolZoneX`,
      description: blog.description,
      url: `${SITE_URL}/blog/tools/${blog.slug}`,
      type: "article",
      images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
    },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const blog = getToolBlogBySlug(slug);
  if (!blog) notFound();

  const isoDate = toIsoDate(blog.date);
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": blog.title,
    "description": blog.description,
    "url": `${SITE_URL}/blog/tools/${blog.slug}`,
    "image": [`${SITE_URL}/og-image.jpg`],
    "datePublished": isoDate,
    "dateModified": isoDate,
    "author": AUTHOR_PERSON_SCHEMA,
    "publisher": {
      "@type": "Organization",
      "name": "ToolZoneX",
      "logo": { "@type": "ImageObject", "url": `${SITE_URL}/logo.png` },
      "sameAs": ORGANIZATION_SAME_AS
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": blog.faq.map(item => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": { "@type": "Answer", "text": item.a }
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <ToolBlogTemplate blog={blog} />
    </>
  );
}
