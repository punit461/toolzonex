import type { Metadata } from "next";
import { GreenScreen } from "../../../calculators/screens/colorScreens";
import tool from "../../../data/tools/utilities-green-screen";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <GreenScreen />
    </>
  );
}
