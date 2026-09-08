import type { Metadata } from "next";
import ExpenseCategoryOrganizer from "../../../calculators/generators/ExpenseCategoryOrganizer";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/generators/expense-category-organizer");
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <ExpenseCategoryOrganizer />
    </>
  );
}
