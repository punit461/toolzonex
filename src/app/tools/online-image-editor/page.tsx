import type { Metadata } from "next";
import OnlineImageEditor from "../../../calculators/tools/OnlineImageEditor";
import tool from "../../../data/tools/tools-online-image-editor";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <OnlineImageEditor />
    </>
  );
}
