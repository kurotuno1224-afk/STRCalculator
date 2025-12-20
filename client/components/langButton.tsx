import { Button } from "./ui/button";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

export type LANGtype = "en" | "jp" | "cn";

export function LangButton({
    lang: LANG,
    setLang: setLANG,
}: {
    lang: LANGtype;
    setLang: (v: LANGtype) => void;
}) {
    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
                <Button>changeLANG: {LANG.toUpperCase()}</Button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Content>
                <DropdownMenu.RadioGroup
                    value={LANG}
                    onValueChange={(v) => setLANG(v as LANGtype)}
                >
                    <DropdownMenu.RadioItem value="en">EN</DropdownMenu.RadioItem>
                    <DropdownMenu.RadioItem value="cn">CN</DropdownMenu.RadioItem>
                    <DropdownMenu.RadioItem value="jp">JP</DropdownMenu.RadioItem>
                </DropdownMenu.RadioGroup>
            </DropdownMenu.Content>
        </DropdownMenu.Root>
    );
}
