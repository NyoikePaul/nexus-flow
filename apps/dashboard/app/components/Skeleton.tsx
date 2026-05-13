export const Sk = ({ className = "" }: { className?: string }) => (
  <div className={`skeleton ${className}`} />
);
export const StatsSk = () => (
  <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-3">
    <Sk className="h-3 w-20" /><Sk className="h-8 w-14" /><Sk className="h-3 w-28" />
  </div>
);
export const RowSk = () => (
  <div className="bg-white border border-slate-200 rounded-xl p-5 flex items-center justify-between gap-4">
    <div className="flex gap-3 items-center flex-1">
      <Sk className="h-10 w-10 rounded-full flex-shrink-0" />
      <div className="space-y-2 flex-1"><Sk className="h-4 w-32" /><Sk className="h-4 w-48" /></div>
    </div>
    <div className="flex items-center gap-4">
      <Sk className="h-6 w-20 rounded-full" />
      <div className="space-y-1"><Sk className="h-2 w-24 rounded-full" /><Sk className="h-3 w-12" /></div>
    </div>
  </div>
);
