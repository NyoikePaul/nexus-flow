import * as React from "react";
export function Card({ className="", children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={`bg-white border border-slate-200 rounded-xl shadow-sm ${className}`} {...props}>{children}</div>;
}
export function CardHeader({ className="", ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={`px-6 py-4 border-b border-slate-100 ${className}`} {...props} />;
}
export function CardContent({ className="", ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={`px-6 py-4 ${className}`} {...props} />;
}
