export default function SelectField({ label, value, onChange, options }) {
  return (
    <div className="mb-6">
      <label className="text-sm text-gray-400 block mb-2">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-[#1a1b23] border border-[#2b2d3a] rounded-lg px-3 py-2.5 text-gray-100 text-sm focus:outline-none focus:border-violet-500"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export function SegmentedField({ label, value, onChange, options }) {
  return (
    <div className="mb-6">
      {label && <label className="text-sm text-gray-400 block mb-2">{label}</label>}
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={`px-3.5 py-1.5 rounded-lg text-sm border transition-colors ${
              value === opt.value
                ? "bg-violet-600 border-violet-500 text-white"
                : "bg-[#1a1b23] border-[#2b2d3a] text-gray-400 hover:border-violet-500/50"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export function ToggleField({ label, value, onChange, onLabel = "Yes", offLabel = "No" }) {
  return (
    <div className="mb-6 flex items-center justify-between">
      <label className="text-sm text-gray-400">{label}</label>
      <button
        type="button"
        onClick={() => onChange(!value)}
        className={`relative w-14 h-8 rounded-full transition-colors ${value ? "bg-violet-600" : "bg-[#2b2d3a]"}`}
      >
        <span
          className={`absolute top-1 left-1 w-6 h-6 rounded-full bg-white transition-transform flex items-center justify-center text-[9px] font-bold text-gray-700 ${
            value ? "translate-x-6" : ""
          }`}
        >
          {value ? onLabel[0] : offLabel[0]}
        </span>
      </button>
    </div>
  );
}

export function NumberField({ label, value, onChange, prefix, suffix, placeholder }) {
  return (
    <div className="mb-6">
      <label className="text-sm text-gray-400 block mb-2">{label}</label>
      <div className="flex items-center bg-[#1a1b23] border border-[#2b2d3a] rounded-lg px-3 focus-within:border-violet-500">
        {prefix && <span className="text-gray-500 text-sm mr-1">{prefix}</span>}
        <input
          type="number"
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value === "" ? "" : Number(e.target.value))}
          className="w-full bg-transparent py-2.5 text-gray-100 text-sm focus:outline-none"
        />
        {suffix && <span className="text-gray-500 text-sm ml-1">{suffix}</span>}
      </div>
    </div>
  );
}

export function DateField({ label, value, onChange }) {
  return (
    <div className="mb-6">
      <label className="text-sm text-gray-400 block mb-2">{label}</label>
      <input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-[#1a1b23] border border-[#2b2d3a] rounded-lg px-3 py-2.5 text-gray-100 text-sm focus:outline-none focus:border-violet-500"
      />
    </div>
  );
}
