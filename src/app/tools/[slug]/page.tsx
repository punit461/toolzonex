import type { Metadata } from "next";
import { toolsRedirectMap } from "../../../data/legacy-redirects";
import { generateRedirectMetadata, LegacyRedirectPage } from "../../../components/LegacyRedirectPage";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Object.keys(toolsRedirectMap).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return generateRedirectMetadata(toolsRedirectMap, slug);
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  return <LegacyRedirectPage map={toolsRedirectMap} slug={slug} />;
}
