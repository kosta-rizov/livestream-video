"use client";

import { Button } from "@/components/ui/button";
import { useSidebar } from "@/store/use-sidebar";
import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";
import { Hint } from "@/components/hint";
import { Skeleton } from "@/components/ui/skeleton";

const Toggle = () => {
  const { collapsed, onCollapse, onExpand } = useSidebar((state) => state);

  const label = collapsed ? "Extend" : "Collapse";

  return (
    <>
      {collapsed && (
        <div className="hidden lg:flex w-full items-center justify-center">
          <Hint label={label} asChild side="right">
            <Button
              variant="ghost"
              className="h-auto p-2 ml-auto"
              onClick={onExpand}
            >
              <ArrowRightFromLine className="w-4 h-4" />
            </Button>
          </Hint>
        </div>
      )}
      {!collapsed && (
        <div className="p-3 pl-6 mb-2 flex items-center w-full">
          <p className="font-semibold text-pretty">For You</p>
          <Hint label={label} asChild side="right">
            <Button
              variant="ghost"
              className="h-auto p-2 ml-auto"
              onClick={onCollapse}
            >
              <ArrowLeftFromLine className="w-4 h-4" />
            </Button>
          </Hint>
        </div>
      )}
    </>
  );
};

export default Toggle;

export const ToggleSkeleton = () => {
  return (
    <div className="p-3 pl-6 mb-2 hidden lg:flex items-center justify-between w-full">
      <Skeleton className="h-6 w-[100px]" />
      <Skeleton className="h-6 w-6" />
    </div>
  );
};
