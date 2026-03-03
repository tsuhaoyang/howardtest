import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { getAllPatterns, getPatternBySlug } from "@/lib/patterns";
import { AppShell } from "@/components/app-shell";
import { PatternDetailHeader } from "@/components/pattern-detail-header";
import { PatternVisualizer } from "@/components/visualizer/pattern-visualizer";
import { mdxComponents } from "@/components/mdx-components";

interface PatternPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const patterns = getAllPatterns();
  return patterns.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PatternPageProps) {
  const { slug } = await params;
  const pattern = getPatternBySlug(slug);
  if (!pattern) return {};

  return {
    title: `${pattern.meta.title} Pattern — DesignPattern.ai`,
    description: pattern.meta.description,
  };
}

export default async function PatternPage({ params }: PatternPageProps) {
  const { slug } = await params;
  const pattern = getPatternBySlug(slug);

  if (!pattern) {
    notFound();
  }

  const allPatterns = getAllPatterns();

  return (
    <AppShell patterns={allPatterns}>
      <div className="p-8 max-w-4xl mx-auto">
        <PatternDetailHeader meta={pattern.meta} />

        <div className="mt-8">
          <PatternVisualizer slug={pattern.meta.slug} />
        </div>

        <div className="mt-8 prose-custom max-w-none">
          <MDXRemote
            source={pattern.content}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
              },
            }}
            components={mdxComponents}
          />
        </div>
      </div>
    </AppShell>
  );
}
