import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ToolBlogTemplate from "../../../../pages/blogs/ToolBlogTemplate";
import { allToolBlogs, getAllToolBlogSlugs, getToolBlogBySlug } from "../../../../data/tool-blogs";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://punit461.github.io/toolzonex';

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
    openGraph: {
      title: `${blog.title} | ToolZoneX`,
      description: blog.description,
      url: `${SITE_URL}/blog/tools/${blog.slug}`,
      type: "article",
    },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const blog = getToolBlogBySlug(slug);
  if (!blog) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": blog.title,
    "description": blog.description,
    "url": `${SITE_URL}/blog/tools/${blog.slug}`,
    "datePublished": "2026-06-01",
    "dateModified": "2026-06-01",
    "author": { "@type": "Organization", "name": "ToolZoneX" },
    "publisher": {
      "@type": "Organization",
      "name": "ToolZoneX",
      "logo": { "@type": "ImageObject", "url": `${SITE_URL}/toolzonex/logo.png` }
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
