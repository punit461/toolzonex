import type { Metadata } from "next";
import HatSizeConverter from "../../../calculators/utilities/HatSizeConverter";
import tool from "../../../data/tools/utilities-hat-size-converter";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <HatSizeConverter />
    </>
  );
}
