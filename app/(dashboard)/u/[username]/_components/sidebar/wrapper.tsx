"use client";
import { ReactNode } from "react";
import { useCreatorSidebar } from "@/store/use-creator-sidebar";
import { cn } from "@/lib/utils";

interface WrapperProps {
  children: ReactNode;
}

const Wrapper = ({ children }: WrapperProps) => {
  const { collapsed } = useCreatorSidebar();

  return (
    <aside
      className={cn(
        "fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-background border-r border-[#2d2e34] z-50",
        collapsed && "lg:w-[70px]"
      )}
    >
      {children}
    </aside>
  );
};

export default Wrapper;
