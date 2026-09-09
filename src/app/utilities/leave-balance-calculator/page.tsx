import type { Metadata } from "next";
import LeaveBalanceCalculator from "../../../calculators/utilities/LeaveBalanceCalculator";
import tool from "../../../data/tools/utilities-leave-balance-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <LeaveBalanceCalculator />
    </>
  );
}
