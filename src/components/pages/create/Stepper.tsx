import {
  Step,
  type StepItem,
  Stepper,
  useStepper,
} from "@/components/ui/stepper";
import { Button } from "@/components/ui/button";
import {
  ExternalLink,
  HandCoins,
  HomeIcon,
  Landmark,
  PackagePlus,
  Wallet,
} from "lucide-react";
import { ChangeEvent, useEffect, useState } from "react";
import { useWalletState } from "@/data/wallet/storage";
import AddAddressModal from "@/components/modals/AddAddressModal";
import { Input } from "@/components/ui/input";
import { useUIState } from "@/data/ui/storage";
import {
  validateAssetId,
  validateDecimals,
  validateInitialMint,
  validateMinBalance,
  validateString,
} from "@/helpers/fieldValidators";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";
import { createAsset } from "@/methods";
import { useConnectionState } from "@/data/connection/storage";
import { convertBigInt } from "@/helpers/convertBigInt";
import { LINKS } from "@/config/constants";
import { ToastAction } from "@/components/ui/toast";
import { useInvalidate } from "@/query/invalidate";
import Spinner from "@/components/ui/spinner";

const steps = [
  { label: "Info", icon: PackagePlus },
  { label: "Config", icon: Landmark },
  { label: "Mint", icon: HandCoins },
] satisfies StepItem[];

export default function StepperCreateAsset() {
  const { walletList, address, wallet } = useWalletState();

  return (
    <div className="flex w-full flex-col gap-4">
      <Stepper initialStep={0} steps={steps}>
        {steps.map((stepProps, index) => {
          if (stepProps.label === "Info") {
            return (
              <Step
                className="w-full flex bg-card"
                key={stepProps.label}
                {...stepProps}
              >
                <InfoStep />{" "}
              </Step>
            );
          } else if (stepProps.label === "Config") {
            return (
              <Step
                className="w-full flex bg-card"
                key={stepProps.label}
                {...stepProps}
              >
                <ConfigStep />{" "}
              </Step>
            );
          } else if (stepProps.label === "Mint") {
            return (
              <Step
                className="w-full flex bg-card"
                key={stepProps.label}
                {...stepProps}
              >
                <MintStep />
              </Step>
            );
          } else {
            return (
              <Step className="w-full" key={stepProps.label} {...stepProps}>
                <div className="h-full flex items-center justify-start p-6 border bg-secondary text-primary rounded-md">
                  <h1 className="text-xl">Step {index + 1}</h1>
                </div>
              </Step>
            );
          }
        })}
        {!wallet || wallet.address !== address ? (
          <div className="flex w-full justify-end items-end">
            <AddAddressModal>
              <Button
                size={"sm"}
                className="font-unbounded font-bold text-xs hover:scale-[102%] flex gap-2 transition-all"
              >
                <Wallet className="w-3 h-3 " />
                <p>Connect</p>
              </Button>
            </AddAddressModal>
          </div>
        ) : (
          <Footer />
        )}
      </Stepper>
    </div>
  );
}

const Footer = () => {
  const { toast } = useToast();
  const { api } = useConnectionState();
  const { wallet, address } = useWalletState();
  const { invalidateAssetsQuery, invalidateBalancesQuery } = useInvalidate();
  const {
    nextStep,
    prevStep,
    resetSteps,
    hasCompletedAllSteps,
    isLastStep,
    isOptionalStep,
    isDisabledStep,
    currentStep,
  } = useStepper();
  const {
    resetCreate,
    pages: {
      create: { name, symbol, assetId, decimals, minBalance, initialMint },
    },
  } = useUIState();
  const [sending, setSending] = useState(false);

  const getDisabled = () => {
    if (currentStep.label === "Info") {
      if (
        name.value !== "" &&
        name.err === "" &&
        symbol.value !== "" &&
        symbol.err === "" &&
        assetId.value !== "" &&
        assetId.err === ""
      )
        return false;

      return true;
    } else if (currentStep.label === "Config") {
      if (
        decimals.value !== "" &&
        decimals.err === "" &&
        minBalance.value !== "" &&
        minBalance.err === ""
      )
        return false;
      return true;
    } else if (currentStep.label === "Mint") {
      if (sending) return true;
      if (initialMint.value !== "" && initialMint.err === "") return false;
      return true;
    }
    return false;
  };

  const handleReset = () => {
    resetCreate();
    resetSteps();
  };

  const handleNextStep = async () => {
    if (!isLastStep) return nextStep();
    if (!wallet || api === null) return;
    setSending(true);
    toast({
      title: "Generating asset ⌛️",
      description: "Loading...",
      variant: "default",
      duration: 70000000,
    });
    const assetDecimals = Number(decimals.value);
    const parsedMinBalance = Number(
      convertBigInt(minBalance.value, assetDecimals)
    );
    const parsedAmount = BigInt(
      convertBigInt(initialMint.value, assetDecimals)
    );

    const result = await createAsset({
      api,
      sender: { address: wallet.address, injector: wallet.injected },
      handleToast,
      assetInfo: {
        assetId: Number(assetId.value),
        admin: wallet.address,
        minBalance: parsedMinBalance,
        name: name.value,
        symbol: symbol.value,
        decimals: assetDecimals,
        amount: parsedAmount,
      },
    });
    if (result.status === "err") {
      setSending(false);
      return toast({
        title: "Something went wrong 😔",
        description:
          "Something went wrong with your transaction, please try again.",
        variant: "destructive",
      });
    } else {
      setSending(false);
      invalidateAssetsQuery();
      invalidateBalancesQuery(address);
      toast({
        title: "Asset created successfully 🚀",
        description: "Congrats! Your asset was created! 🎉",
        variant: "success",
        action: (
          <Link href={`${LINKS.subscan}/tx/${result.hash}`} target="_blank">
            <ToastAction
              className="bg-colors-bg-light  p-3 rounded-md hover:text-white transition-all hover:bg-colors-grey-line font-unbounded text-sm font-bold"
              altText="Link"
            >
              <ExternalLink className="w-4 h-4" />
            </ToastAction>
          </Link>
        ),
      });
      return nextStep();
    }
  };

  const handleToast = ({
    title,
    description,
    variant,
  }: {
    title: string;
    description: string;
    variant:
      | "default"
      | "destructive"
      | "success"
      | "warning"
      | null
      | undefined;
  }) => {
    toast({
      title,
      description,
      variant,
    });
  };

  return (
    <>
      {hasCompletedAllSteps && <CongratsStep />}
      <div className="w-full flex justify-end gap-2">
        {hasCompletedAllSteps ? (
          <Button size="sm" onClick={handleReset}>
            Reset
          </Button>
        ) : (
          <>
            <Button
              disabled={isDisabledStep}
              onClick={prevStep}
              size="sm"
              variant="outline"
              className="font-unbounded font-bold text-xs hover:scale-[102%] transition-all"
            >
              Prev
            </Button>
            <Button
              size="sm"
              className="font-unbounded font-bold text-xs hover:scale-[102%] transition-all w-[170px]"
              onClick={handleNextStep}
              disabled={getDisabled()}
            >
              {isLastStep ? (
                sending ? (
                  <Spinner className="!fill-white w-4 h-4" />
                ) : (
                  "Create and Mint 🎉"
                )
              ) : isOptionalStep ? (
                "Skip"
              ) : (
                "Next"
              )}
            </Button>
          </>
        )}
      </div>
    </>
  );
};

const InfoStep = () => {
  const {
    setCreateName,
    setCreateSymbol,
    setCreateAssetId,
    pages: {
      create: { name, symbol, assetId },
    },
  } = useUIState();
  const { assetsMetadata: assets } = useWalletState();

  const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    const err = validateString(e.target.value);
    setCreateName({ value: e.target.value, err });
  };
  const handleChangeSymbol = (e: ChangeEvent<HTMLInputElement>) => {
    const err = validateString(e.target.value.toUpperCase(), 4);
    setCreateSymbol({ value: e.target.value.toUpperCase(), err });
  };

  const handleChangeAssetId = (e: ChangeEvent<HTMLInputElement>) => {
    const err = validateAssetId(e.target.value, assets);

    setCreateAssetId({ value: e.target.value, err });
  };

  return (
    <div className="h-full bg-card flex flex-col items-start w-full justify-start p-6 border gap-4 text-primary rounded-md">
      <div className="flex flex-col gap-1">
        {" "}
        <h1 className="text-xl font-bold font-unbounded">Asset Information </h1>
        <p className="text-xs text-colors-font-primary">
          Here you can set the asset information, like name, symbol, etc.
        </p>
      </div>

      <form className="flex flex-col gap-3 w-full text-white">
        <div className="flex flex-col gap-1">
          <label className="text-colors-font-primary pl-1  text-sm font-bold">
            Name:
          </label>
          <Input
            value={name.value}
            onChange={(e) => handleChangeName(e)}
            type="text"
            placeholder="Example: USDC Coin, Polkadot, etc"
          />
          {!!name.err && (
            <p className=" text-sm pl-1 font-bold text-red-700">{name.err}</p>
          )}
        </div>
        <div className="flex flex-col pl-1 gap-1">
          <label className="text-colors-font-primary text-sm font-bold">
            Symbol:
          </label>
          <Input
            value={symbol.value}
            onChange={(e) => handleChangeSymbol(e)}
            type="text"
            placeholder="Example: USCD, DOT, etc"
          />
          {!!symbol.err && (
            <p className=" text-sm pl-1 font-bold text-red-700">{symbol.err}</p>
          )}
        </div>
        <div className="flex flex-col pl-1 gap-1">
          <label className="text-colors-font-primary text-sm font-bold">
            Asset ID:
          </label>
          <Input
            value={assetId.value}
            onChange={(e) => handleChangeAssetId(e)}
            type="number"
            placeholder="Example: 10, 22, 304, etc"
          />
          {!!assetId.err && (
            <p className=" text-sm pl-1 font-bold text-red-700">
              {assetId.err}
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

const ConfigStep = () => {
  const {
    setCreateDecimals,
    setCreateMinBalance,
    pages: {
      create: { decimals, minBalance },
    },
  } = useUIState();

  const handleChangDecimals = (e: ChangeEvent<HTMLInputElement>) => {
    const err = validateDecimals(e.target.value);
    setCreateDecimals({ value: e.target.value, err });
  };
  const handleChangeMinBalance = (e: ChangeEvent<HTMLInputElement>) => {
    const err = validateMinBalance(e.target.value);
    setCreateMinBalance({ value: e.target.value, err });
  };

  return (
    <div className="h-full bg-card flex flex-col items-start w-full justify-start p-6 border gap-4 text-primary rounded-md">
      <div className="flex flex-col gap-1">
        {" "}
        <h1 className="text-xl font-bold font-unbounded">Asset Config </h1>
        <p className="text-xs text-colors-font-primary">
          Here you can set the asset config, like decimals and min. balance.
        </p>
      </div>

      <form className="flex flex-col gap-3 w-full text-white">
        <div className="flex flex-col gap-1">
          <label className="text-colors-font-primary pl-1  text-sm font-bold">
            Decimals:
          </label>
          <Input
            value={decimals.value}
            onChange={(e) => handleChangDecimals(e)}
            type="number"
            placeholder="Example: 18, 12, 6, etc"
          />
          {!!decimals.err && (
            <p className=" text-sm pl-1 font-bold text-red-700">
              {decimals.err}
            </p>
          )}
        </div>
        <div className="flex flex-col pl-1 gap-1">
          <label className="text-colors-font-primary text-sm font-bold">
            Min. Balance:
          </label>
          <Input
            value={minBalance.value}
            onChange={(e) => handleChangeMinBalance(e)}
            type="number"
            placeholder="Example: 0.1, 0.01, 1, etc"
          />
          {!!minBalance.err && (
            <p className=" text-sm pl-1 font-bold text-red-700">
              {minBalance.err}
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

const MintStep = () => {
  const {
    setCreateInitialMint,
    pages: {
      create: { initialMint },
    },
  } = useUIState();

  const handleChangInitialMint = (e: ChangeEvent<HTMLInputElement>) => {
    const err = validateInitialMint(e.target.value);
    setCreateInitialMint({ value: e.target.value, err });
  };

  return (
    <div className="h-full bg-card flex flex-col items-start w-full justify-start p-6 border gap-4 text-primary rounded-md">
      <div className="flex flex-col gap-1">
        {" "}
        <h1 className="text-xl font-bold font-unbounded">Asset Mint </h1>
        <p className="text-xs text-colors-font-primary">
          Here you can set the asset initial mint.
        </p>
      </div>

      <form className="flex flex-col gap-3 w-full text-white">
        <div className="flex flex-col gap-1">
          <label className="text-colors-font-primary pl-1  text-sm font-bold">
            Initial mint:
          </label>
          <Input
            value={initialMint.value}
            onChange={(e) => handleChangInitialMint(e)}
            type="number"
            placeholder="Example: 10000, 1000000, etc"
          />
          {!!initialMint.err && (
            <p className=" text-sm pl-1 font-bold text-red-700">
              {initialMint.err}
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

const CongratsStep = () => {
  return (
    <div className="h-full bg-card flex flex-col items-start w-full justify-start p-6 border gap-4 text-primary rounded-md">
      <div className="flex flex-col gap-1">
        {" "}
        <h1 className="text-xl font-bold font-unbounded">
          Done! You created your new asset! 🚀
        </h1>
        <div className="flex flex-col justify-start items-start gap-1">
          <p className="  text-xs text-colors-font-primary">
            Congratulations on successfully creating your new asset! You can now
            transfer it using the transfer functionality{" "}
            <Link href={"/transfer"}>
              <Button className="p-0 text-xs m-0 h-auto" variant={"link"}>
                here
              </Button>
            </Link>
            .
          </p>
          {/* <p className="text-xs m-0 text-colors-font-primary">
            Also, thank you for sharing your experience on Twitter!{" "}
            <Link href={"/transfer"}>
              <Button className="p-0 text-xs m-0 h-auto" variant={"link"}>
                Click here
              </Button>
            </Link>{" "}
            to tweet about it and spread the word!{" "}
          </p> */}
        </div>
      </div>
    </div>
  );
};
