import * as React from "react";
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
}
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "primary", ...props }, ref) => (
    <button ref={ref} className={`px-4 py-2 rounded-lg font-medium transition-all ${
      variant==="primary"   ? "bg-blue-600 text-white hover:bg-blue-700" :
      variant==="secondary" ? "bg-slate-100 text-slate-700 hover:bg-slate-200" :
                              "text-slate-600 hover:bg-slate-100"
    } ${className}`} {...props} />
  )
);
Button.displayName = "Button";
