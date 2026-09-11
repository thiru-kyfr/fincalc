const PATHS = {
  "trending-up": <path d="M3 17l6-6 4 4 8-9M14 6h7v7" />,
  wallet: <path d="M3 7a2 2 0 0 1 2-2h13a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Zm0 4h18M16 13.5h.01" />,
  "arrow-down-circle": <path d="M12 8v8m0 0 3.5-3.5M12 16l-3.5-3.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />,
  "pie-chart": <path d="M12 3v9l7.5 4.3A9 9 0 1 1 12 3Z" />,
  steps: <path d="M3 21v-4h4v-4h4V9h4V5h4v16H3Z" />,
  percent: <path d="M5 19 19 5M7 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm10 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />,
  activity: <path d="M3 12h4l2.5-7L14 19l2.5-7H21" />,
  target: <path d="M21 12a9 9 0 1 1-9-9M21 3l-8 8m8-8h-5m5 0v5M16 12a4 4 0 1 1-4-4" />,
  shield: <path d="M12 3l8 3v6c0 4.5-3.2 8-8 9-4.8-1-8-4.5-8-9V6l8-3Z" />,
  lock: <path d="M6 11V8a6 6 0 1 1 12 0v3M5 11h14v9H5v-9Z" />,
  briefcase: <path d="M4 8h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Zm4 0V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 13h18" />,
  landmark: <path d="M4 21h16M5 21V10M9 21V10M15 21V10M19 21V10M2 10l10-6 10 6M3 10h18" />,
  repeat: <path d="M17 2l4 4-4 4M3 11V9a4 4 0 0 1 4-4h14M7 22l-4-4 4-4M21 13v2a4 4 0 0 1-4 4H3" />,
  umbrella: <path d="M12 3a9 9 0 0 1 9 9H3a9 9 0 0 1 9-9Zm0 0v16.5a2 2 0 0 1-4 0" />,
  heart: <path d="M12 21s-7.5-4.6-10-9.3C.4 8.1 2.4 4.5 6 4a5 5 0 0 1 6 3 5 5 0 0 1 6-3c3.6.5 5.6 4.1 4 7.7C19.5 16.4 12 21 12 21Z" />,
  award: <path d="M12 15a6 6 0 1 0 0-12 6 6 0 0 0 0 12Zm-4 1.5L7 22l5-3 5 3-1-5.5" />,
  mail: <path d="M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm0 0 8 7 8-7" />,
  users: <path d="M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-6 9c0-3.3 2.7-6 6-6s6 2.7 6 6M17 11a3 3 0 1 0 0-6M17 14c2.5 0 5 1.5 5 5" />,
  sunset: <path d="M3 18h18M6 18a6 6 0 0 1 12 0M8 14l-2-2M16 14l2-2M12 12V8M4 8l2 1M20 8l-2 1" />,
  receipt: <path d="M5 3h14v18l-3-2-3 2-3-2-3 2-2-2V3Zm3 5h8M8 12h8M8 16h5" />,
  home: <path d="M4 11.5 12 4l8 7.5M6 10v10h12V10" />,
  scissors: <path d="M6 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm0 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm14-15L7.5 18M6.5 6 20 19" />,
  gift: <path d="M4 10h16v10H4V10Zm-1-4h18v4H3V6Zm9 0V4a2 2 0 1 0-2 2h2Zm0 0V4a2 2 0 1 1 2 2h-2Zm0 0v14" />,
  calculator: <path d="M5 3h14v18H5V3Zm2 4h10M8 12h.01M12 12h.01M16 12h.01M8 16h.01M12 16h.01M16 16h.01" />,
  car: <path d="M4 16V9.5l2-4h12l2 4V16M4 16h16M4 16v3h3v-3M17 16v3h3v-3M7 12h10" />,
  "plus-circle": <path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM12 8v8M8 12h8" />,
  layers: <path d="m12 3 9 5-9 5-9-5 9-5Zm-9 9 9 5 9-5M3 16l9 5 9-5" />,
  scale: <path d="M12 3v18M7 7H2l3.5 7a3 3 0 0 0 5 0L7 7Zm10 0h5l-3.5 7a3 3 0 0 1-5 0L17 7ZM7 7l5-2 5 2M6 21h12" />,
  "bar-chart": <path d="M4 20V10m6 10V4m6 16v-7" />,
  sliders: <path d="M4 6h9M17 6h3M4 18h3M11 18h9M4 6a2 2 0 1 1 4 0 2 2 0 0 1-4 0Zm4 12a2 2 0 1 1 4 0 2 2 0 0 1-4 0Zm9-12a2 2 0 1 1 4 0 2 2 0 0 1-4 0Z" />,
  layers2: <path d="M3 6h4v4H3V6Zm7 0h4v4h-4V6Zm7 0h4v4h-4V6ZM3 14h4v4H3v-4Zm7 0h4v4h-4v-4Zm7 0h4v4h-4v-4Z" />,
};

export default function Icon({ name, className = "", size = 20, style }) {
  const path = PATHS[name] || PATHS["trending-up"];
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
    >
      {path}
    </svg>
  );
}
