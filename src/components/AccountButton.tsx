import { WalletIcon, X } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { shortenAddress } from "@/helpers/shortenAddress";
import { Web3Key } from "@/types/wallets";
import { getWalletCopy } from "@/config/wallets.config";
import { useWalletState } from "@/data/wallet/storage";
import { cn } from "@/lib/utils";

const AccountButton = ({
  address,
  walletId,
  handleRemove,
  handleClick,
  disabled = false,
  selected,
}: {
  address: string;
  walletId?: Web3Key;
  handleRemove?: (...args: any[]) => void;
  handleClick: (...args: any[]) => void;
  disabled?: boolean;
  selected?: boolean;
}) => {
  const { address: activeAddress } = useWalletState();
  const Icon = walletId && getWalletCopy.getIcon(walletId);

  return (
    <div className="w-full flex gap-1 items-stretch">
      <Button
        variant={"outline"}
        disabled={disabled}
        className={cn(
          "w-full flex items-center justify-between bg-colors-bg-light text-colors-font-primary hover:text-white hover:bg-colors-bg-secondary border-transparent",
          { "border-colors-pink-dot": selected }
        )}
        onClick={() => handleClick(address)}
      >
        <div className="flex items-center  gap-2 justify-center">
          {walletId && Icon !== undefined ? (
            <Icon className="w-4 h-4" />
          ) : (
            <WalletIcon className="!w-4 !h-4 text-colors-pink-dot" />
          )}
          <p className="p-0 m-0 mt-[2px]">{shortenAddress(address, 9)}</p>
          {!walletId && (
            <Badge
              variant="outline"
              className="h-4 px-2 !text-xs border-yellow-500 font-light text-yellow-500 "
            >
              Read only
            </Badge>
          )}
        </div>

        {activeAddress === address && (
          <Badge
            variant="outline"
            className="h-4 px-2 !text-xs border-green-400 font-normal text-green-400 "
          >
            Active
          </Badge>
        )}
      </Button>
      {handleRemove && (
        <Button
          onClick={() => handleRemove(address, walletId)}
          className="flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50  bg-transparent text-card-foreground text-colors-font-seconday hover:text-red-600 hover:scale-[102%] transition-all hover:bg-card  h-full"
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};

export default AccountButton;
