import type { Metadata } from "next";
import { RedScreen } from "../../../calculators/screens/colorScreens";
import tool from "../../../data/tools/utilities-red-screen";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <RedScreen />
    </>
  );
}
