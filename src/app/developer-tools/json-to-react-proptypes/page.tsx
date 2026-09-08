import type { Metadata } from "next";
import JsonToReactPropTypes from "../../../calculators/developer-tools/JsonToReactPropTypes";
import tool from "../../../data/tools/developer-tools-json-to-react-proptypes";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <JsonToReactPropTypes />
    </>
  );
}
