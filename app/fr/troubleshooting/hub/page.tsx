import { HubView } from "@/components/views/HubView";
import { hubMetadata } from "@/lib/page-meta";

export const metadata = hubMetadata("fr");

export default function TroubleshootingHubPage() {
  return <HubView lang="fr" />;
}
