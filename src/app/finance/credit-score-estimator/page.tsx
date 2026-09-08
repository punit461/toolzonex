import type { Metadata } from "next";
import CreditScoreEstimator from "../../../calculators/finance/CreditScoreEstimator";
import tool from "../../../data/tools/finance-credit-score-estimator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <CreditScoreEstimator />
    </>
  );
}
