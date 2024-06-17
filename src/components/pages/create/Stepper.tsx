import {
  Step,
  type StepItem,
  Stepper,
  useStepper,
} from "@/components/ui/stepper";
import { Button } from "@/components/ui/button";
import {
  HandCoins,
  HomeIcon,
  Landmark,
  PackagePlus,
  Wallet,
} from "lucide-react";
import { useEffect } from "react";
import { useWalletState } from "@/data/wallet/storage";
import AddAddressModal from "@/components/modals/AddAddressModal";

const steps = [
  { label: "Info", icon: PackagePlus },
  { label: "Config", icon: Landmark },
  { label: "Mint", icon: HandCoins },
] satisfies StepItem[];

export default function StepperCreateAsset() {
  const { walletList, address } = useWalletState();

  return (
    <div className="flex w-full flex-col gap-4">
      <Stepper initialStep={0} steps={steps}>
        {steps.map((stepProps, index) => {
          return (
            <Step key={stepProps.label} {...stepProps}>
              <div className="h-full flex items-center justify-start p-6 border bg-secondary text-primary rounded-md">
                <h1 className="text-xl">Step {index + 1}</h1>
              </div>
            </Step>
          );
        })}
        {walletList.length === 0 ||
        walletList.filter((wallet) => wallet.address !== address).length !==
          0 ? (
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
          <Footer isDisabled={false} />
        )}
      </Stepper>
    </div>
  );
}

const Footer = ({ isDisabled }: { isDisabled?: boolean }) => {
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

  return (
    <>
      {hasCompletedAllSteps && (
        <div className="h-40 flex items-center justify-center my-2 border bg-secondary text-primary rounded-md">
          <h1 className="text-xl">Woohoo! All steps completed! 🎉</h1>
        </div>
      )}
      <div className="w-full flex justify-end gap-2">
        {hasCompletedAllSteps ? (
          <Button size="sm" onClick={resetSteps}>
            Reset
          </Button>
        ) : (
          <>
            <Button
              disabled={isDisabledStep}
              onClick={prevStep}
              size="sm"
              variant="secondary"
              className="font-unbounded font-bold text-xs hover:scale-[102%] transition-all"
            >
              Prev
            </Button>
            <Button
              size="sm"
              className="font-unbounded font-bold text-xs hover:scale-[102%] transition-all"
              onClick={nextStep}
              disabled={isDisabled}
            >
              {isLastStep
                ? "Create and Mint 🎉"
                : isOptionalStep
                ? "Skip"
                : "Next"}
            </Button>
          </>
        )}
      </div>
    </>
  );
};
