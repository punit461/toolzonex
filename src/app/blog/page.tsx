import type { Metadata } from "next";
import BlogList from "../../pages/BlogList";

export const metadata: Metadata = {
  title: "Personal Finance & Health Blog",
  description: "Expert guides and tips on taxation, saving, investments, and health.",
  alternates: { canonical: "/blog" },
};

export default function Page() {
  return <BlogList />;
}
