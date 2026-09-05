import type { Metadata } from "next";
import ExtensionCordLoadCalculator from "../../../calculators/utilities/ExtensionCordLoadCalculator";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/utilities/extension-cord-load-calculator");
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <ExtensionCordLoadCalculator />
    </>
  );
}
