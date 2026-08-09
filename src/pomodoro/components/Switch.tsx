interface SwitchProps {
  checked: boolean
  onChange: (checked: boolean) => void
  label: string
  description?: string
}

export function Switch({ checked, onChange, label, description }: SwitchProps) {
  return (
    <div className="flex items-start justify-between gap-4 py-3">
      <div>
        <span className="block text-sm font-medium text-text">{label}</span>
        {description && <span className="mt-0.5 block text-sm text-text-muted">{description}</span>}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ${
          checked ? 'bg-primary' : 'bg-border'
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-surface shadow transition-transform duration-200 ${
            checked ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  )
}
