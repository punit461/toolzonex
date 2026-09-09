import type { Metadata } from "next";
import PlaylistOrganizer from "../../../calculators/generators/PlaylistOrganizer";
import tool from "../../../data/tools/generators-playlist-organizer";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <PlaylistOrganizer />
    </>
  );
}
