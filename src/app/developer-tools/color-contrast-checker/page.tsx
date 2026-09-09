import type { Metadata } from "next";
import ColorContrastChecker from "../../../calculators/developer-tools/ColorContrastChecker";
import tool from "../../../data/tools/developer-tools-color-contrast-checker";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <ColorContrastChecker />
    </>
  );
}
