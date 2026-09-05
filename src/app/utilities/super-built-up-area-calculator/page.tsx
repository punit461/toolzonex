import type { Metadata } from "next";
import SuperBuiltUpAreaCalculator from "../../../calculators/utilities/SuperBuiltUpAreaCalculator";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/utilities/super-built-up-area-calculator");
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <SuperBuiltUpAreaCalculator />
    </>
  );
}
