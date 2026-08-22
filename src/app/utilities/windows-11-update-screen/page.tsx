import type { Metadata } from "next";
import { Windows11UpdateScreen } from "../../../calculators/screens/windowsScreens";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/utilities/windows-11-update-screen");

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <Windows11UpdateScreen />
    </>
  );
}
