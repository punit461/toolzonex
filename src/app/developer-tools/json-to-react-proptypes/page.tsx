import type { Metadata } from "next";
import JsonToReactPropTypes from "../../../calculators/developer-tools/JsonToReactPropTypes";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/developer-tools/json-to-react-proptypes");

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
