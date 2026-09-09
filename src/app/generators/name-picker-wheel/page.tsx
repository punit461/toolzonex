import type { Metadata } from "next";
import NamePickerWheel from "../../../calculators/generators/NamePickerWheel";
import tool from "../../../data/tools/generators-name-picker-wheel";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <NamePickerWheel />
    </>
  );
}
