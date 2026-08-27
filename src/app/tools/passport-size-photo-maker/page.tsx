import type { Metadata } from "next";
import PassportSizePhotoMaker from "../../../calculators/pdf/PassportSizePhotoMaker";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/tools/passport-size-photo-maker");

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <PassportSizePhotoMaker />
    </>
  );
}
