import type { Metadata } from "next";
import MealPlannerGenerator from "../../../calculators/generators/MealPlannerGenerator";
import tool from "../../../data/tools/generators-meal-planner-generator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <MealPlannerGenerator />
    </>
  );
}
