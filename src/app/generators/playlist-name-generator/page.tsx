import type { Metadata } from "next";
import PlaylistNameGenerator from "../../../calculators/generators/PlaylistNameGenerator";
import tool from "../../../data/tools/generators-playlist-name-generator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <PlaylistNameGenerator />
    </>
  );
}
