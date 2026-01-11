export type Lang = (typeof LANG)[keyof typeof LANG];

const DB_BASE = "https://cdn.jsdelivr.net/gh/Mar-7th/StarRailRes@master/index_new";
const ASSET_BASE = "https://cdn.jsdelivr.net/gh/Mar-7th/StarRailRes@master";
const LANG = {
  EN: "en",
  CN: "cn",
  JP: "jp",
} as const;

export const HAKUSH_ZZZ_ASSET_BASE = "https://api.hakush.in/zzz" as const;

export function zzzAsset(path: string) {
  return `${HAKUSH_ZZZ_ASSET_BASE}/${path.replace(/^\//, "")}`;
}

const iconUrl = zzzAsset("UI/IconRoleSelect13.webp");

export { DB_BASE, ASSET_BASE, LANG, iconUrl };
