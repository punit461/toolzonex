import type { Metadata } from "next";
import MoodPicker from "../../../calculators/generators/MoodPicker";
import tool from "../../../data/tools/generators-mood-picker";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <MoodPicker />
    </>
  );
}
