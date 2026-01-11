export type Lang = (typeof LANG)[keyof typeof LANG];

const DB_BASE = "https://vizualabstract.github.io/StarRailStaticAPI/db";
const ASSET_BASE = "https://vizualabstract.github.io/StarRailStaticAPI/assets";
const LANG = {
  EN: "en",
  CN: "cn",
  JP: "jp",
} as const;

export const HAKUSH_ZZZ_ASSET_BASE = "https://api.hakush.in/zzz" as const;

export function zzzAsset(path: string) {
  return `${HAKUSH_ZZZ_ASSET_BASE}/${path.replace(/^\//, "")}`;
}

// 用法
const iconUrl = zzzAsset("UI/IconRoleSelect13.webp");

export { DB_BASE, ASSET_BASE, LANG, iconUrl };
