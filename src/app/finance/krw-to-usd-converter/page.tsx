import type { Metadata } from "next";
import KrwToUsdConverter from "../../../calculators/finance/KrwToUsdConverter";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/finance/krw-to-usd-converter");

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <KrwToUsdConverter />
    </>
  );
}
