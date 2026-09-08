import type { Metadata } from "next";
import WindowAreaCalculator from "../../../calculators/utilities/WindowAreaCalculator";
import tool from "../../../data/tools/utilities-window-area-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <WindowAreaCalculator />
    </>
  );
}
