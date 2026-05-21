import { HomeView } from "@/components/views/HomeView";
import { homeMetadata } from "@/lib/page-meta";

export const metadata = homeMetadata("de");

export default function Home() {
  return <HomeView lang="de" />;
}
