import type { Metadata } from "next";
import RecipeOrganizer from "../../../calculators/generators/RecipeOrganizer";
import tool from "../../../data/tools/generators-recipe-organizer";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <RecipeOrganizer />
    </>
  );
}
