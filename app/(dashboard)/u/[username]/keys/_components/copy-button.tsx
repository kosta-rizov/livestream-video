"use client";

import { Button } from "@/components/ui/button";
import { CheckCheck, Copy } from "lucide-react";
import { useState } from "react";

interface CopyButtonProps {
  value?: string;
}

const CopyButton = ({ value }: CopyButtonProps) => {
  const [isCopy, setIsCopy] = useState(false);

  const onCopy = () => {
    if (!value) return;

    setIsCopy(true);
    navigator.clipboard.writeText(value);

    setTimeout(() => {
      setIsCopy(false);
    }, 1000);
  };

  const Icon = isCopy ? CheckCheck : Copy;

  return (
    <Button
      onClick={onCopy}
      disabled={!value || isCopy}
      variant="ghost"
      size="sm"
    >
      <Icon />
    </Button>
  );
};

export default CopyButton;
