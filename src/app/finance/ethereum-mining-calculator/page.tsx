import type { Metadata } from "next";
import EthereumMiningCalculator from "../../../calculators/finance/EthereumMiningCalculator";
import tool from "../../../data/tools/finance-ethereum-mining-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <EthereumMiningCalculator />
    </>
  );
}
