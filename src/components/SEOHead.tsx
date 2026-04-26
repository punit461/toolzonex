import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title: string;
  description: string;
  url?: string;
}

const SEOHead = ({ title, description, url }: SEOHeadProps) => {
  const siteName = "ToolZoneX";
  const fullTitle = `${title} | ${siteName}`;
  const siteUrl = import.meta.env.VITE_SITE_URL ?? 'https://toolzonex.com';
  const canonicalUrl = url ? `${siteUrl}${url}` : siteUrl;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={siteName} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
};

export default SEOHead;
