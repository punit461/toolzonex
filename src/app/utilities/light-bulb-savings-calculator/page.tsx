import type { Metadata } from "next";
import LightBulbSavingsCalculator from "../../../calculators/utilities/LightBulbSavingsCalculator";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/utilities/light-bulb-savings-calculator");
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <LightBulbSavingsCalculator />
    </>
  );
}
