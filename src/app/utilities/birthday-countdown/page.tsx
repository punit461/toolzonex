import type { Metadata } from "next";
import BirthdayCountdown from "../../../calculators/utilities/BirthdayCountdown";
import tool from "../../../data/tools/utilities-birthday-countdown";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <BirthdayCountdown />
    </>
  );
}
