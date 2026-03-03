import { getAllPatterns } from "@/lib/patterns";
import { Dashboard } from "@/components/dashboard";
import { AppShell } from "@/components/app-shell";

export default function Home() {
  const patterns = getAllPatterns();

  return (
    <AppShell patterns={patterns}>
      <Dashboard patterns={patterns} />
    </AppShell>
  );
}
