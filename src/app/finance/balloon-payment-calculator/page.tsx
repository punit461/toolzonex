import type { Metadata } from "next";
import BalloonPaymentCalculator from "../../../calculators/finance/BalloonPaymentCalculator";
import tool from "../../../data/tools/finance-balloon-payment-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <BalloonPaymentCalculator />
    </>
  );
}
