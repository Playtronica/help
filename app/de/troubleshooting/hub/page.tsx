import { HubView } from "@/components/views/HubView";
import { hubMetadata } from "@/lib/page-meta";

export const metadata = hubMetadata("de");

export default function TroubleshootingHubPage() {
  return <HubView lang="de" />;
}
