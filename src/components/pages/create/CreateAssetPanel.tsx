import { Button } from "@/components/ui/button";
import { useConnectionState } from "@/data/connection/storage";
import { useWalletState } from "@/data/wallet/storage";
import { createAsset, mintAsset } from "@/methods";

import React, { useEffect } from "react";
import StepperCreateAsset from "./Stepper";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

type Props = {};

function CreateAssetPanel({}: Props) {
  const { toast } = useToast();

  return (
    <div className="flex flex-col gap-2 w-full">
      <StepperCreateAsset />
    </div>
  );
}

export default CreateAssetPanel;
