import { useEffect, useMemo, useState } from "react";
import { ASSET_BASE, DB_BASE, type Lang } from "@/hooks/Dbhooks";

export type Character = {
  id: string;
  name: string;
  icon?: string;
  preview?: string;
  portrait?: string;
};
export type CharactersResponse = Record<string, Character>;

export function assetUrl(p?: string) {
  return p ? `${ASSET_BASE}/${p}` : "";
}

type Options = {
  initialLang?: Lang;
  initialSelectedId?: string;
};

export function useHsrCharacters(opts: Options = {}) {
  const [data, setData] = useState<CharactersResponse | null>(null);
  const [q, setQ] = useState("");
  const [selectedId, setSelectedId] = useState<string>(
    opts.initialSelectedId ?? "1001"
  );
  const [lang, setLang] = useState<Lang>(opts.initialLang ?? "en");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const ac = new AbortController();

    (async () => {
      try {
        setLoading(true);
        setError("");

        const url = `${DB_BASE}/${lang}/characters.json`;
        const res = await fetch(url, { signal: ac.signal });
        if (!res.ok)
          throw new Error(`characters.json load failed: ${res.status}`);

        const json = (await res.json()) as CharactersResponse;
        setData(json);

        setSelectedId((prev) => {
          if (json[prev] != null) return prev;
          const first = Object.keys(json)[0];
          return first ?? prev;
        });
      } catch (e: unknown) {
        if (e instanceof DOMException && e.name === "AbortError") {
          return;
        }

        console.error(e);
        setData(null);
        setError(e instanceof Error ? e.message : "load failed");
      } finally {
        setLoading(false);
      }
    })();

    return () => ac.abort();
  }, [lang]);

  const list = useMemo(() => {
    if (!data) return [];
    const arr = Object.values(data);
    arr.sort((a, b) => Number(a.id) - Number(b.id));
    return arr;
  }, [data]);

  const filtered = useMemo(() => {
    const kw = q.trim().toLowerCase();
    if (!kw) return list;
    return list.filter(
      (c) => c.id.includes(kw) || c.name.toLowerCase().includes(kw)
    );
  }, [list, q]);

  const selected = useMemo(() => data?.[selectedId], [data, selectedId]);

  return {
    data,
    q,
    selectedId,
    lang,
    loading,
    error,
    list,
    filtered,
    selected,
    setQ,
    setSelectedId,
    setLang,
  };
}
