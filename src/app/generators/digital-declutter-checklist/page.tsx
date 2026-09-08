import type { Metadata } from "next";
import DigitalDeclutterChecklist from "../../../calculators/generators/DigitalDeclutterChecklist";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/generators/digital-declutter-checklist");
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <DigitalDeclutterChecklist />
    </>
  );
}
