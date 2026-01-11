import { useEffect, useMemo, useState } from "react";
import type { LANGtype } from "@/components/langButton";
import { LangButton } from "@/components/langButton";
import { ASSET_BASE, DB_BASE, LANG, iconUrl } from "@/hooks/Dbhooks";

type Character = {
  id: string;
  name: string;
  icon?: string;
  preview?: string;
  portrait?: string;
};
type CharactersResponse = Record<string, Character>;

function assetUrl(p?: string) {
  return p ? `${ASSET_BASE}/${p}` : "";
}
export default function HsrAssetsRoute() {
  const [data, setData] = useState<CharactersResponse | null>(null);
  const [q, setQ] = useState("");
  const [selectedId, setSelectedId] = useState<string>("1001");

  useEffect(() => {
    (async () => {
      const url = `${DB_BASE}/${LANG.JP}/characters.json`;
      const res = await fetch(url);
      if (!res.ok)
        throw new Error(`characters.json load failed: ${res.status}`);
      const json = (await res.json()) as CharactersResponse;
      setData(json);
      if (json[selectedId] == null) {
        const first = Object.keys(json)[0];
        if (first) setSelectedId(first);
      }
    })().catch((e) => {
      console.error(e);
      setData(null);
    });
  }, [selectedId]);

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

  const selected = data?.[selectedId];
  const [LANG, setLANG] = useState<LANGtype>("en");
  return (
    <div style={{ padding: 16 }} className="text-white">
      <h2>HSR Icon / 立绘 测试</h2>
      <LangButton lang={LANG} setLang={setLANG}></LangButton>

      <div style={{ display: "flex", gap: 12, margin: "12px 0" }}>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="输入角色ID或名字过滤"
          style={{ flex: 1, padding: 10 }}
        />
      </div>

      {!data && <p>加载失败（看控制台）。</p>}

      {!!data && (
        <div
          style={{ display: "grid", gridTemplateColumns: "360px 1fr", gap: 16 }}
        >
          <div
            style={{
              border: "1px solid #ddd",
              borderRadius: 8,
              padding: 12,
              height: 720,
              overflow: "auto",
            }}
          >
            {filtered.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedId(c.id)}
                style={{
                  width: "100%",
                  textAlign: "left",
                  padding: 10,
                  marginBottom: 6,
                  borderRadius: 8,
                  border:
                    c.id === selectedId ? "2px solid #333" : "1px solid #ddd",
                  background: "transparent",
                  cursor: "pointer",
                }}
              >
                <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  <img
                    src={assetUrl(c.icon)}
                    alt={c.name}
                    width={40}
                    height={40}
                    style={{ borderRadius: 8, objectFit: "cover" }}
                    loading="lazy"
                  />
                  <div>
                    <div style={{ fontWeight: 600 }}>{c.name}</div>
                    <div style={{ fontSize: 12, opacity: 0.7 }}>{c.id}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div
            style={{ border: "1px solid #ddd", borderRadius: 8, padding: 12 }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: 12,
              }}
            >
              <div>
                <div style={{ fontWeight: 700, fontSize: 18 }}>
                  {selected?.name ?? "—"}
                </div>
                <div style={{ fontSize: 12, opacity: 0.7 }}>
                  id: {selected?.id ?? "—"}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                {selected?.icon && (
                  <a
                    href={assetUrl(selected.icon)}
                    target="_blank"
                    rel="noreferrer"
                  >
                    icon
                  </a>
                )}
                {selected?.preview && (
                  <a
                    href={assetUrl(selected.preview)}
                    target="_blank"
                    rel="noreferrer"
                  >
                    preview
                  </a>
                )}
                {selected?.portrait && (
                  <a
                    href={assetUrl(selected.portrait)}
                    target="_blank"
                    rel="noreferrer"
                  >
                    portrait
                  </a>
                )}
              </div>
            </div>

            <hr style={{ margin: "12px 0" }} />

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 12,
              }}
            >
              <div>
                <div style={{ fontWeight: 600, marginBottom: 6 }}>Preview</div>
                {selected?.preview ? (
                  <img
                    src={assetUrl(selected.preview)}
                    alt={`${selected?.name} preview`}
                    style={{
                      width: "100%",
                      borderRadius: 12,
                      border: "1px solid #eee",
                    }}
                  />
                ) : (
                  <div style={{ opacity: 0.7 }}>No preview</div>
                )}
              </div>

              <div>
                <div style={{ fontWeight: 600, marginBottom: 6 }}>Portrait</div>
                {selected?.portrait ? (
                  <img
                    src={assetUrl(selected.portrait)}
                    alt={`${selected?.name} portrait`}
                    style={{
                      width: "100%",
                      borderRadius: 12,
                      border: "1px solid #eee",
                    }}
                  />
                ) : (
                  <div style={{ opacity: 0.7 }}>No portrait</div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
