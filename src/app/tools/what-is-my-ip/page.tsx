import type { Metadata } from "next";
import WhatIsMyIP from "../../../calculators/tools/WhatIsMyIP";
import tool from "../../../data/tools/tools-what-is-my-ip";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <WhatIsMyIP />
    </>
  );
}
