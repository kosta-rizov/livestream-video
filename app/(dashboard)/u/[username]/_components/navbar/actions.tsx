import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LogOut } from "lucide-react";
import { UserButton } from "@clerk/nextjs";

const Actions = () => {
  return (
    <div className="flex items-center justify-center gap-x-2">
      <Button
        size="sm"
        variant="ghost"
        className="text-muted-foreground hover:text-primary"
      >
        <Link href="/">
          <LogOut className="w-5 h-5 mr-2" />
          Exit
        </Link>
      </Button>
      <UserButton afterSignOutUrl="/" />
    </div>
  );
};

export default Actions;
