import { Button } from "./ui/button";
import type { Lang } from "@/hooks/Dbhooks";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";

export function LangButton({
  lang: LANG,
  setLang: setLANG,
}: {
  lang: Lang;
  setLang: (v: Lang) => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>changeLANG: {LANG.toUpperCase()}</Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuRadioGroup
          value={LANG}
          onValueChange={(v) => setLANG(v as Lang)}
        >
          <DropdownMenuRadioItem value="en">EN</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="cn">CN</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="jp">JP</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
