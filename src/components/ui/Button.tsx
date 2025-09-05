import * as React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "xs";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center rounded font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed";
    const variants: Record<string, string> = {
      primary: "bg-blue-600 text-white hover:bg-blue-700",
      outline: "border border-neutral-300 text-neutral-700 bg-white hover:bg-neutral-50",
      ghost: "text-neutral-600 hover:bg-neutral-100",
    };
    const sizes: Record<string, string> = {
      md: "h-10 px-4 text-sm",
      sm: "h-9 px-3 text-sm",
      xs: "h-7 px-2 text-[11px]",
    };
    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";