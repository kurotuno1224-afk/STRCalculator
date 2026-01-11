import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";


export function NaviButton() {
  const navigate = useNavigate();
  return <Button onClick={() => navigate("hsr-asssete")}>gogogo</Button>;
}
