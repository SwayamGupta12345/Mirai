import AskDoubtClient from "./AskDoubtClient";
export default function AskDoubtPage() {
  return <AskDoubtClient />;
}
export const dynamic = "force-dynamic"; // Ensure this page is always dynamic
export const revalidate = 0; // Disable static regeneration for this page
