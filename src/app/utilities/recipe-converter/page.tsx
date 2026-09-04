import type { Metadata } from "next";
import RecipeConverter from "../../../calculators/utilities/RecipeConverter";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/utilities/recipe-converter");

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
