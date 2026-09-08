import type { Metadata } from "next";
import RomanNumeralConverter from "../../../calculators/utilities/RomanNumeralConverter";
import tool from "../../../data/tools/utilities-roman-numeral-converter";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <RomanNumeralConverter />
    </>
  );
}
