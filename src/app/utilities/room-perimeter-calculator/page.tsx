import type { Metadata } from "next";
import RoomPerimeterCalculator from "../../../calculators/utilities/RoomPerimeterCalculator";
import tool from "../../../data/tools/utilities-room-perimeter-calculator";
import { getShellProps } from "../../../utils/resolveShellProps";
import { ShellPropsProvider } from "../../../components/CalculatorShell";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  const shellProps = getShellProps(tool);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <ShellPropsProvider value={shellProps}>
        <RoomPerimeterCalculator />
      </ShellPropsProvider>
    </>
  );
}
