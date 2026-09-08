import type { Metadata } from "next";
import DigitalDeclutterChecklist from "../../../calculators/generators/DigitalDeclutterChecklist";
import tool from "../../../data/tools/generators-digital-declutter-checklist";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <DigitalDeclutterChecklist />
    </>
  );
}
