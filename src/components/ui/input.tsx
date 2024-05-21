import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  StartIcon?: ({ className }: { className?: string }) => JSX.Element;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, StartIcon, ...props }, ref) => {
    return (
      <div className="w-full max-w-[500px] relative flex">
        <input
          type={type}
          className={cn(
            "peer flex h-10 w-full rounded-md border border-input bg-background py-2 px-4 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50",
            StartIcon ? "pl-8" : "",
            className
          )}
          ref={ref}
          {...props}
        />
        {StartIcon && <StartIcon />}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
