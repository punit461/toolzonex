import type { Metadata } from "next";
import SvgToReactNative from "../../../calculators/developer-tools/SvgToReactNative";
import tool from "../../../data/tools/developer-tools-svg-to-react-native";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <SvgToReactNative />
    </>
  );
}
