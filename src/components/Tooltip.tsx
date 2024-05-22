import {
  Tooltip as ImportTooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type Props = {
  children: JSX.Element | JSX.Element[];
  message: string;
  className?: string;
  classNameParent?: string;
};

function Tooltip({ children, message, className, classNameParent }: Props) {
  return (
    <TooltipProvider>
      <ImportTooltip>
        <TooltipTrigger className="flex items-end">{children}</TooltipTrigger>
        <TooltipContent className={classNameParent}>
          <p className={className}>{message}</p>
        </TooltipContent>
      </ImportTooltip>
    </TooltipProvider>
  );
}

export default Tooltip;
