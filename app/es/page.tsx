import { HomeView } from "@/components/views/HomeView";
import { homeMetadata } from "@/lib/page-meta";

export const metadata = homeMetadata("es");

export default function Home() {
  return <HomeView lang="es" />;
}
