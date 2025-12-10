export default function BorderCard({
  title,
  children,
  variant = "default", 
  color = "#4f46e5",  
}) {
  const isBorder = variant === "border";

  return (
    <div
      className={`rounded-xl p-4 shadow-lg bg-white w-full`}
      style={{
        borderLeft: isBorder ? `6px solid ${color}` : "none",
      }}
    >
      {/* Title */}
      {title && (
        <h2
          className={`font-sm mb-0`}
        >
          {title}
        </h2>
      )}

      {/* Content */}
      <div className="text-sm text-gray-700">{children}</div>
    </div>
  );
}