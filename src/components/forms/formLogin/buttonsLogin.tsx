import { GithubIcon } from "@/components/icons/GitHubIcon";
import GoogleIcon from "@/components/icons/GoogleIcon";
import { Button } from "@/components/ui/button";

export default function ButtonsLogin() {
  return (
    <div className="flex flex-col gap-2">
      <Button variant="outline" className="gap-2">
        <GoogleIcon />
        Login com o google
      </Button>
      <Button variant="outline" className="gap-2">
        <GithubIcon />
        Login com GitHub
      </Button>
    </div>
  );
}
