import { HomeView } from "@/components/views/HomeView";
import { homeMetadata } from "@/lib/page-meta";

export const metadata = homeMetadata("fr");

export default function Home() {
  return <HomeView lang="fr" />;
}
