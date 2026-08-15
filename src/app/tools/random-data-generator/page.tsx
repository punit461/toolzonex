import type { Metadata } from "next";

const NEW_PATH = "/generators/random-data-generator";

export const metadata: Metadata = {
  title: "Redirecting... - ToolZoneX",
  robots: { index: false, follow: true },
  alternates: { canonical: NEW_PATH },
};

export default function RedirectPage() {
  return (
    <>
      <meta httpEquiv="refresh" content={`0; url=${NEW_PATH}`} />
      <p>
        This page has moved to <a href={NEW_PATH}>{NEW_PATH}</a>.
      </p>
    </>
  );
}
