export function BrandMark({ size = 24 }: { size?: number }) {
  return (
    <div
      className="bg-ink rounded-md flex items-center justify-center shrink-0"
      style={{ width: size, height: size }}
    >
      <span
        className="font-display italic text-bg leading-none"
        style={{ fontSize: size * 0.72, marginTop: -size * 0.05 }}
      >
        F
      </span>
    </div>
  );
}

export function BrandLockup() {
  return (
    <div className="flex items-center gap-2">
      <BrandMark size={22} />
      <span className="font-semibold text-[14px] tracking-tight">Formstack</span>
    </div>
  );
}