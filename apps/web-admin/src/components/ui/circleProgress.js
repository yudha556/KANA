export default function DonutChart({
  progress = 75,
  size = 120,
  strokeWidth = 12,
  status = "",
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  // Warna sesuai status
  const colors = {
    healthy: "#22c55e", 
    warning: "#eab308", 
    error: "#ef4444",  
  };

  const strokeColor = colors[status] || colors.healthy;

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size}>
        {/* Lingkaran background */}
        <circle
          stroke="#e5e7eb" // gray-300
          fill="transparent"
          strokeWidth={strokeWidth}
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />

        {/* Lingkaran progress */}
        <circle
          stroke={strokeColor}
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          r={radius}
          cx={size / 2}
          cy={size / 2}
          style={{ transition: "stroke-dashoffset 0.5s ease" }}
        />
      </svg>

      {/* Text persentase */}
      <span className="absolute text-lg font-semibold">
        {progress}%
      </span>
    </div>
  );
}