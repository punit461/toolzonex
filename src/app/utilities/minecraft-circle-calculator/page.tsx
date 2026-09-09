import type { Metadata } from "next";
import MinecraftCircleCalculator from "../../../calculators/utilities/MinecraftCircleCalculator";
import tool from "../../../data/tools/utilities-minecraft-circle-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <MinecraftCircleCalculator />
    </>
  );
}
