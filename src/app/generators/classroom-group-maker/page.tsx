import type { Metadata } from "next";
import ClassroomGroupMaker from "../../../calculators/generators/ClassroomGroupMaker";
import tool from "../../../data/tools/generators-classroom-group-maker";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <ClassroomGroupMaker />
    </>
  );
}
