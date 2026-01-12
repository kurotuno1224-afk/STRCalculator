import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  //   CardDescription,
} from "./ui/card";
import type { Character } from "@/hooks/useHsrCharacters";
import { Badge } from "@/components/ui/badge";
import { assetUrl } from "@/hooks/useHsrCharacters";

export function HeroCard({ hero }: { hero?: Character }) {
  if (!hero) return null;
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>{hero.name}</CardTitle>
          <Badge> {hero.id}</Badge>
        </CardHeader>
        <CardContent>
          <img src={assetUrl(hero.preview)} />
          <img src={assetUrl(hero.portrait)} />
        </CardContent>
        <CardFooter className=" flex-col items-center text-muted-foreground">数据来源 。。。 请支持原网站</CardFooter>
      </Card>
    </div>
  );
}
