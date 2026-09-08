import type { Metadata } from "next";
import LotteryNumberGenerator from "../../../calculators/generators/LotteryNumberGenerator";
import tool from "../../../data/tools/generators-lottery-number-generator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <LotteryNumberGenerator />
    </>
  );
}
