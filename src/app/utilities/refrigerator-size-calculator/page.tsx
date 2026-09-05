import type { Metadata } from "next";
import RefrigeratorSizeCalculator from "../../../calculators/utilities/RefrigeratorSizeCalculator";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/utilities/refrigerator-size-calculator");

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <RefrigeratorSizeCalculator />
    </>
  );
}
