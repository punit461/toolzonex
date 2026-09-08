import type { Metadata } from "next";
import { OrangeScreen } from "../../../calculators/screens/colorScreens";
import tool from "../../../data/tools/utilities-orange-screen";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <OrangeScreen />
    </>
  );
}
