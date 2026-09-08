import type { Metadata } from "next";
import TipScreen from "../../../calculators/screens/TipScreen";
import tool from "../../../data/tools/utilities-tip-screen";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <TipScreen />
    </>
  );
}
