import { getAllPages } from "@/lib/content";
import { ArticleView } from "@/components/views/ArticleView";
import { articleMetadata } from "@/lib/page-meta";

export async function generateStaticParams() {
  return getAllPages("en").map((p) => ({ section: p.section, slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { section: string; slug: string };
}) {
  return articleMetadata("fr", params.section, params.slug);
}

export default function ArticlePage({
  params,
}: {
  params: { section: string; slug: string };
}) {
  return <ArticleView lang="fr" section={params.section} slug={params.slug} />;
}
