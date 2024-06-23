import { ToasterToast, useToast } from "@/components/ui/use-toast";

import { Injected, InjectedExtension } from "@polkadot/extension-inject/types";
import { Button } from "./ui/button";
import { InjectedWindow, Wallet, Web3Key } from "@/types/wallets";
import { SupportedWallets, getWalletCopy } from "@/config/wallets.config";
import Link from "next/link";
import { LINKS } from "@/config/constants";
import { useWalletState } from "@/data/wallet/storage";
import { parseAddress } from "@/helpers/parseAddress";
import { cn } from "@/lib/utils";
import { Badge } from "./ui/badge";

type Props = { handleClose: () => void };

function ConnectWalletButton({ handleClose }: Props) {
  const injectedWindow = window as InjectedWindow;
  const { setWalletList, walletList, setLoaded } = useWalletState();
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

      setLoaded(false);
      setWalletList({
        walletId,
        address: parseAddress(address[0].address),
        injected: injectedExtension,
      });
      toast({
        title: "Wallet connected successfully 🎉.",
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
    <div className="flex h-full items-center gap-3 justify-center ">
      {SupportedWallets.map((wallet) => {
        return (
          <WalletButton
            walletId={wallet}
            injectedWindow={injectedWindow}
            handleConnect={handleConnect}
            walletList={walletList}
            key={`${wallet}-injected`}
          />
        );
      })}
    </div>
  );
}

export default ConnectWalletButton;

type WalletButtonProps = {
  walletId: Web3Key;
  injectedWindow: InjectedWindow;
  handleConnect: (
    walletId: Web3Key,
    isInjected: {
      enable: any;
      version: string;
    }
  ) => Promise<
    | {
        id: string;
        dismiss: () => void;
        update: (props: ToasterToast) => void;
      }
    | undefined
  >;
  walletList: Wallet[];
};

const WalletButton = ({
  walletId,
  injectedWindow,
  handleConnect,
  walletList,
}: WalletButtonProps) => {
  const isInjected = injectedWindow?.injectedWeb3?.[walletId];

  const Icon = getWalletCopy.getIcon(walletId);

  // Extension is not installed
  if (isInjected === undefined)
    return (
      <Link
        href={LINKS.wallets[walletId]}
        target="_blank"
        className="w-1/3 sm:max-w-[145px] h-[145px] flex"
      >
        <Button
          variant={"outline"}
          className="w-full h-full flex flex-col gap-2 relative text-colors-font-primary"
        >
          <Icon className="h-4 w-4 sm:w-8 sm:h-8" />
          <div className="flex flex-col">
            <p className="font-bold font-unbounded text-xs sm:text-sm">
              {getWalletCopy.parsedName(walletId)}
            </p>
          </div>
          <Badge
            variant="outline"
            className="h-5 !text-xs border-yellow-400 text-yellow-500  absolute bottom-3"
          >
            Install
          </Badge>
        </Button>
      </Link>
    );

  // Extension is installed
  return (
    <Button
      className="w-1/3 sm:max-w-[145px] h-[145px] flex flex-col gap-2 relative text-colors-font-primary"
      onClick={() => {
        handleConnect(walletId, isInjected);
      }}
      disabled={walletList.some((w) => w.walletId === walletId)}
      variant={"outline"}
    >
      <Icon className="h-4 w-4 sm:w-8 sm:h-8 " />
      <div className="flex flex-col">
        <p className="font-bold font-unbounded text-xs sm:text-sm">
          {getWalletCopy.parsedName(walletId)}
        </p>
      </div>
      {walletList.some((w) => w.walletId === walletId) && (
        <Badge
          variant="outline"
          className="h-5 !text-xs border-green-400 text-green-400 absolute bottom-3"
        >
          Connected
        </Badge>
      )}
    </Button>
  );
};
