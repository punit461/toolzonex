import type { Metadata } from "next";
import RecipeConverter from "../../../calculators/utilities/RecipeConverter";
import tool from "../../../data/tools/utilities-recipe-converter";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <RecipeConverter />
    </>
  );
}
