import type { ReactNode } from 'react';

type QuestionBlockProps = {
  index: number;
  label: string;
  required?: boolean;
  helpText?: string;
  children: ReactNode;
};

export function QuestionBlock({
  index,
  label,
  required,
  helpText,
  children,
}: QuestionBlockProps) {
  const num = String(index).padStart(2, '0');
  return (
    <div className="flex gap-5">
      {/* Number prefix */}
      <div className="pt-[3px] shrink-0 w-6 text-right">
        <span className="text-[11px] font-mono text-muted-2 nums">{num}</span>
      </div>

      {/* Question body */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start gap-1.5 mb-1">
          <span className="text-[18px] font-medium text-ink leading-snug">{label}</span>
          {required && (
            <span className="text-primary text-[14px] leading-snug mt-0.5 shrink-0">*</span>
          )}
        </div>
        {helpText && (
          <p className="font-display italic text-[13.5px] text-muted mb-3 leading-relaxed">
            {helpText}
          </p>
        )}
        <div className="mt-3">{children}</div>
      </div>
    </div>
  );
}