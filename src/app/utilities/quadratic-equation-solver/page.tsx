import type { Metadata } from "next";
import QuadraticEquationSolver from "../../../calculators/utilities/QuadraticEquationSolver";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/utilities/quadratic-equation-solver");

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <QuadraticEquationSolver />
    </>
  );
}
