import { SECTION_TITLES } from "@/lib/content";
import { SectionView } from "@/components/views/SectionView";
import { sectionMetadata } from "@/lib/page-meta";

export async function generateStaticParams() {
  return Object.keys(SECTION_TITLES).map((section) => ({ section }));
}

export async function generateMetadata({ params }: { params: { section: string } }) {
  return sectionMetadata("es", params.section);
}

export default function SectionIndex({ params }: { params: { section: string } }) {
  return <SectionView lang="es" section={params.section} />;
}
