import type { Metadata } from "next";
import BatteryBackupCalculator from "../../../calculators/utilities/BatteryBackupCalculator";
import tool from "../../../data/tools/utilities-battery-backup-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <BatteryBackupCalculator />
    </>
  );
}
