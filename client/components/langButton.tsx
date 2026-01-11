import { Button } from "./ui/button";
import type { Lang } from "@/hooks/Dbhooks";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

export function LangButton({
    lang: LANG,
    setLang: setLANG,
}: {
    lang: Lang;
    setLang: (v: Lang) => void;
}) {
    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
                <Button>changeLANG: {LANG.toUpperCase()}</Button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Content>
                <DropdownMenu.RadioGroup
                className=""
                    value={LANG}
                    onValueChange={(v) => setLANG(v as Lang)}
                >
                    <DropdownMenu.RadioItem value="en">EN</DropdownMenu.RadioItem>
                    <DropdownMenu.RadioItem value="cn">CN</DropdownMenu.RadioItem>
                    <DropdownMenu.RadioItem value="jp">JP</DropdownMenu.RadioItem>
                </DropdownMenu.RadioGroup>
            </DropdownMenu.Content>
        </DropdownMenu.Root>
    );
}
