import type { Metadata } from "next";
import OnlineNotepad from "../../../calculators/OnlineNotepad";

export const metadata: Metadata = {
  title: "Online Notepad",
  description: "Simple online notepad.",
  alternates: { canonical: "/tools/online-notepad" },
};

export default function Page() {
  return <OnlineNotepad />;
}
