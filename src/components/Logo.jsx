export default function Logo({ size = 28 }) {
  return (
    <img
      src="/logo.png"
      alt=""
      width={size}
      height={size}
      style={{ width: size, height: size, borderRadius: size * 0.25 }}
    />
  );
}
