import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { PatternMeta, PatternCategory } from "@/store/pattern-store";

const contentDirectory = path.join(process.cwd(), "src/content");

export function getAllPatterns(): PatternMeta[] {
  if (!fs.existsSync(contentDirectory)) {
    return [];
  }

  const files = fs.readdirSync(contentDirectory).filter((f) => f.endsWith(".mdx"));

  return files.map((filename) => {
    const filePath = path.join(contentDirectory, filename);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(fileContent);

    return {
      slug: filename.replace(".mdx", ""),
      title: data.title as string,
      category: data.category as PatternCategory,
      complexity: data.complexity as 1 | 2 | 3,
      description: data.description as string,
      icon: data.icon as string,
    };
  });
}

export function getPatternBySlug(slug: string): {
  meta: PatternMeta;
  content: string;
} | null {
  const filePath = path.join(contentDirectory, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  return {
    meta: {
      slug,
      title: data.title as string,
      category: data.category as PatternCategory,
      complexity: data.complexity as 1 | 2 | 3,
      description: data.description as string,
      icon: data.icon as string,
    },
    content,
  };
}

export function getPatternsByCategory(): Record<PatternCategory, PatternMeta[]> {
  const all = getAllPatterns();

  return {
    creational: all.filter((p) => p.category === "creational"),
    structural: all.filter((p) => p.category === "structural"),
    behavioral: all.filter((p) => p.category === "behavioral"),
  };
}
