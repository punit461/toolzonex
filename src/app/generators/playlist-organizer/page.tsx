import type { Metadata } from "next";
import PlaylistOrganizer from "../../../calculators/generators/PlaylistOrganizer";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/generators/playlist-organizer");
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <PlaylistOrganizer />
    </>
  );
}
