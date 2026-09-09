import type { Metadata } from "next";
import TopsoilCalculator from "../../../calculators/utilities/TopsoilCalculator";
import tool from "../../../data/tools/utilities-topsoil-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <TopsoilCalculator />
    </>
  );
}
