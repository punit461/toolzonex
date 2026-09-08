import type { Metadata } from "next";
import { Windows10BsodScreen } from "../../../calculators/screens/windowsScreens";
import tool from "../../../data/tools/utilities-windows-10-blue-screen";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <Windows10BsodScreen />
    </>
  );
}
