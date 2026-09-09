import type { Metadata } from "next";
import ContrastChecker from "../../../calculators/tools/ContrastChecker";
import tool from "../../../data/tools/tools-contrast-checker";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <ContrastChecker />
    </>
  );
}
