import type { Metadata } from "next";
import { calculatorsRedirectMap } from "../../../data/legacy-redirects";
import { generateRedirectMetadata, LegacyRedirectPage } from "../../../components/LegacyRedirectPage";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Object.keys(calculatorsRedirectMap).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return generateRedirectMetadata(calculatorsRedirectMap, slug);
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  return <LegacyRedirectPage map={calculatorsRedirectMap} slug={slug} />;
}
