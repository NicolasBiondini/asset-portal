import {
  Tooltip as ImportTooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type Props = {
  children: JSX.Element | JSX.Element[];
  message: string;
};

function Tooltip({ children, message }: Props) {
  return (
    <TooltipProvider>
      <ImportTooltip>
        <TooltipTrigger className="flex items-end">{children}</TooltipTrigger>
        <TooltipContent>
          <p>{message}</p>
        </TooltipContent>
      </ImportTooltip>
    </TooltipProvider>
  );
}

export default Tooltip;
