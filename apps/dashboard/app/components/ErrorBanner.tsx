"use client";
import { AlertTriangle, X } from "lucide-react";
export function ErrorBanner({ msg, onClose }: { msg: string; onClose: () => void }) {
  return (
    <div className="flex items-center gap-3 bg-amber-50 border border-amber-200 text-amber-800 px-4 py-3 rounded-xl text-sm mb-6">
      <AlertTriangle className="w-4 h-4 flex-shrink-0" />
      <span className="flex-1">{msg}</span>
      <button onClick={onClose}><X className="w-4 h-4" /></button>
    </div>
  );
}
