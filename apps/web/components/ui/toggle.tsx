import { useState } from 'react';
import type { ReactNode } from 'react';

type ToggleProps = {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  size?: 'sm' | 'md';
};

export function Toggle({ checked: controlledChecked, onChange, size = 'md' }: ToggleProps) {
  const [internalChecked, setInternalChecked] = useState(false);
  const isChecked = controlledChecked !== undefined ? controlledChecked : internalChecked;

  const handleClick = () => {
    const next = !isChecked;
    setInternalChecked(next);
    onChange?.(next);
  };

  const trackClass = size === 'sm'
    ? 'w-7 h-4'
    : 'w-9 h-5';
  const thumbClass = size === 'sm'
    ? 'w-3 h-3 top-0.5'
    : 'w-3.5 h-3.5 top-[3px]';
  const translateClass = size === 'sm'
    ? (isChecked ? 'translate-x-3.5' : 'translate-x-0.5')
    : (isChecked ? 'translate-x-[18px]' : 'translate-x-[3px]');

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isChecked}
      onClick={handleClick}
      className={`relative inline-flex shrink-0 rounded-full transition-colors focus:outline-none ${trackClass} ${
        isChecked ? 'bg-primary' : 'bg-line-strong'
      }`}
    >
      <span
        className={`absolute rounded-full bg-white shadow-sm transition-transform ${thumbClass} ${translateClass}`}
      />
    </button>
  );
}

// Controlled stateful toggle for settings rows
type SettingToggleProps = {
  label: string;
  description?: string;
  defaultChecked?: boolean;
  children?: ReactNode;
};

export function SettingToggle({ label, description, defaultChecked = false, children }: SettingToggleProps) {
  const [checked, setChecked] = useState(defaultChecked);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <div className="text-[13.5px] font-medium text-ink">{label}</div>
          {description && (
            <div className="text-[12px] text-muted mt-0.5">{description}</div>
          )}
        </div>
        <Toggle checked={checked} onChange={setChecked} />
      </div>
      {checked && children && (
        <div className="ml-0 mt-1">
          {children}
        </div>
      )}
    </div>
  );
}