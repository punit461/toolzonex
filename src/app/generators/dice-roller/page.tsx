import type { Metadata } from "next";
import DiceRoller from "../../../calculators/generators/DiceRoller";
import tool from "../../../data/tools/generators-dice-roller";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <DiceRoller />
    </>
  );
}
