import { useToast } from "@/components/ui/use-toast";

import { Injected, InjectedExtension } from "@polkadot/extension-inject/types";
import { Button } from "./ui/button";
import { InjectedWindow, Web3Key } from "@/types/wallets";
import { SupportedWallets, getWalletCopy } from "@/config/wallets.config";
import Link from "next/link";
import { LINKS } from "@/config/constants";
import { useWalletState } from "@/data/wallet/storage";
import { parseAddress } from "@/helpers/parseAddress";

type Props = { handleClose: () => void };

function ConnectWalletButton({ handleClose }: Props) {
  const injectedWindow = window as InjectedWindow;
  const { setWalletList, walletList } = useWalletState();
  const { toast } = useToast();

  const handleConnect = async (
    walletId: Web3Key,
    isInjected: {
      enable: any;
      version: string;
    }
  ) => {
    try {
      const injected: Injected = await isInjected?.enable("my app");
      const injectedExtension: InjectedExtension = {
        ...injected,
        name: walletId,
        version: isInjected?.version || "0",
      };
      const address = await injectedExtension.accounts.get();
      if (address.length === 0)
        return toast({
          title: "😔 Something went wrong.",
          description: "Please try again.",
          variant: "warning",
        });

      setWalletList({
        walletId,
        address: parseAddress(address[0].address),
        injected: injectedExtension,
      });
      toast({
        title: "Wallet connected sussesfully 🎉.",
        variant: "success",
      });
      handleClose();
    } catch (error) {
      toast({
        title: "⚠️ Connection denied by the user.",
        description: "Please try again.",
        variant: "warning",
      });
    }
  };

  return (
    <div>
      {SupportedWallets.map((wallet) => {
        const isInjected = injectedWindow?.injectedWeb3?.[wallet];

        const Icon = getWalletCopy.getIcon(wallet);

        if (isInjected === undefined)
          return (
            <Link
              href={LINKS.wallets[wallet]}
              target="_blank"
              key={`${wallet}-no-injected`}
            >
              <Button>
                <Icon className="w-4 h-4" />
                Install {getWalletCopy.parsedName(wallet)}
              </Button>
            </Link>
          );

        return (
          <Button
            onClick={() => {
              handleConnect(wallet, isInjected);
            }}
            key={`${wallet}-injected`}
            disabled={walletList.some((w) => w.walletId === wallet)}
          >
            <Icon className="w-4 h-4" />
            Connect {getWalletCopy.parsedName(wallet)}
          </Button>
        );
      })}
    </div>
  );
}

export default ConnectWalletButton;
