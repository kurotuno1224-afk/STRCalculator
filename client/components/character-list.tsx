import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { assetUrl, type Character } from "@/hooks/useHsrCharacters";
import { Badge } from "@/components/ui/badge";

export function CharacterList({
  items,
  selectedId,
  onSelect,
  emptyText,
}: {
  items: Character[];
  selectedId: string;
  onSelect: (id: string) => void;
  emptyText?: string;
}) {
  return (
    <ScrollArea className="h-[72vh] pr-2">
      <div className="space-y-2">
        {items.length === 0 && (
          <div className="rounded-xl border border-dashed p-6 text-sm text-muted-foreground">
            {emptyText ?? "没有匹配结果"}
          </div>
        )}

        {items.map((c) => {
          const active = c.id === selectedId;
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => onSelect(c.id)}
              className={cn(
                "group w-full rounded-xl border p-3 text-left transition",
                "hover:bg-accent/40 hover:border-accent-foreground/20",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                active
                  ? "border-primary/40 bg-primary/10"
                  : "border-border bg-card"
              )}
            >
              <div className="flex items-center gap-3">
                <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg border bg-muted">
                  {c.icon ? (
                    <img
                      src={assetUrl(c.icon)}
                      alt={c.name}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="h-full w-full" />
                  )}
                  <div className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100">
                    <div className="h-full w-full bg-gradient-to-tr from-transparent via-transparent to-white/10" />
                  </div>
                </div>

                <div className="min-w-0 flex-1">
                  <div className="truncate font-medium leading-5">{c.name}</div>
                  <div className="mt-1 flex items-center gap-2">
                    <Badge
                      variant={active ? "default" : "secondary"}
                      className="h-5"
                    >
                      {c.id}
                    </Badge>
                    <span className="truncate text-xs text-muted-foreground">
                      {c.preview ? "preview" : "no preview"} ·{" "}
                      {c.portrait ? "portrait" : "no portrait"}
                    </span>
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </ScrollArea>
  );
}
