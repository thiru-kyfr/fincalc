export default function Logo({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect width="48" height="48" rx="12" fill="url(#ktools-logo-g)" />
      <path
        d="M16 11v26M16 24l12-13M18.5 26.5 28 37"
        stroke="#fff"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient id="ktools-logo-g" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#9F5FE5" />
          <stop offset="1" stopColor="#F03BBD" />
        </linearGradient>
      </defs>
    </svg>
  );
}
