import { LangButton } from "@/components/langButton";
import { useHsrCharacters, } from "@/hooks/useHsrCharacters";
import { CharacterList } from "@/components/character-list";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { HeroCard } from "@/components/hero-card";

// function LinkButton({ href, label }: { href: string; label: string }) {
//   return (
//     <Button asChild variant="secondary" size="sm" className="h-8">
//       <a href={href} target="_blank" rel="noreferrer">
//         {label}
//       </a>
//     </Button>
//   );
// }

export default function HsrAssetsRoute() {
  const {
    data,
    q,
    selectedId,
    lang,
    loading,
    error,
    filtered,
    selected,
    list,
    setQ,
    setSelectedId,
    setLang,
  } = useHsrCharacters({ initialSelectedId: "1001", initialLang: "en" });

  return (
    <div>
      <div className="min-h-screen bg-background text-foreground">
        <div className="mx-auto max-w-6xl px-4 py-6">
          {/* Header */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-semibold tracking-tight">
                  HSR Assets Browser
                </h2>
                <Badge variant="secondary" className="h-6">
                  {lang.toUpperCase()}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Icons / Preview / Portrait 快速检索与查看
              </p>
            </div>

            <div className="flex items-center gap-2">
              <LangButton lang={lang} setLang={setLang} />
            </div>
          </div>

          {/* Toolbar */}
          <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_auto] sm:items-center">
            <div className="relative">
              <Input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="输入角色ID或名字过滤"
                className="h-10"
              />
              <div className="mt-2 text-xs text-muted-foreground">
                {loading
                  ? "加载中…"
                  : `共 ${list.length} 条，当前 ${filtered.length} 条`}
                {error ? ` · ${error}` : ""}
              </div>
            </div>

            <div className="flex gap-2 sm:justify-end">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setQ("")}
                disabled={!q}
              >
                清空
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  if (!data) return;
                  const ids = Object.keys(data);
                  const next = ids[0];
                  if (next) setSelectedId(next);
                }}
                disabled={!data}
              >
                选中首个
              </Button>
            </div>
          </div>

          {/* Main */}
          <div className="mt-5 grid gap-4 lg:grid-cols-[360px_1fr]">
            {/* Left: list */}
            <Card className="overflow-hidden">
              <CardHeader className="py-4">
                <CardTitle className="text-base">Characters</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                {!data && loading && (
                  <div className="space-y-2">
                    {Array.from({ length: 10 }).map((_, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 rounded-xl border p-3"
                      >
                        <Skeleton className="h-11 w-11 rounded-lg" />
                        <div className="flex-1 space-y-2">
                          <Skeleton className="h-4 w-40" />
                          <Skeleton className="h-3 w-24" />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {!!data && (
                  <CharacterList
                    items={filtered}
                    selectedId={selectedId}
                    onSelect={setSelectedId}
                    emptyText="没有匹配的角色，请更换关键词"
                  />
                )}

                {!loading && !data && (
                  <div className="rounded-xl border border-dashed p-6 text-sm text-muted-foreground">
                    加载失败。请检查网络与控制台日志。
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Right: detail */}
           <HeroCard hero ={ selected }/>
          </div>
        </div>
      </div>
    </div>
  );
}
