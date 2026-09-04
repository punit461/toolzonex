import type { Metadata } from "next";
import BannerSizeCalculator from "../../../calculators/utilities/BannerSizeCalculator";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/utilities/banner-size-calculator");
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <BannerSizeCalculator />
    </>
  );
}
