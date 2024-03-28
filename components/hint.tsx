import { ReactNode } from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface HintProps {
    label: string;
    children: ReactNode;
    asChild?: boolean;
    side?: "top" | "bootom" | "left" | "right";
    aling?: "start" | "center" | "end";
}

export const Hint = ({label, children, asChild, side, aling}: HintProps) => {

    return (
        <TooltipProvider>
            <Tooltip delayDuration={0}>
                <TooltipTrigger asChild={asChild}>
                    {children}
                </TooltipTrigger>
                <TooltipContent 
                    className="text-black bg-white" 
                    side={side} 
                    align={aling}
                >
                    <p className="font-semibold">{label}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}