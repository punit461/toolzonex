import type { Metadata } from "next";
import ClassroomGroupMaker from "../../../calculators/generators/ClassroomGroupMaker";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/generators/classroom-group-maker");
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <ClassroomGroupMaker />
    </>
  );
}
