import { CheckCircle, Clock } from "lucide-react";

export default function Badge({ status = "healthy", children }) {
  const base = "px-3 py-1 rounded-lg text-sm w-fit inline-flex items-center";

  const variants = {
    healthy: "bg-green-100 text-green-700 border border-green-300",
    warning: "bg-yellow-100 text-yellow-700 border border-yellow-300",
    error: "bg-red-100 text-red-700 border border-red-300",
    complete: "bg-green-100 text-green-700 border border-green-300",
    "in-progress": "bg-yellow-100 text-yellow-700 border border-yellow-300",
  };

  const normalize = (s) =>
    String(s || "").toLowerCase().replace(/\s+/g, "-").replace(/_+/g, "-");

  const key = normalize(status);

  const icons = {
    complete: CheckCircle,
    "in-progress": Clock,
  };

  const Icon = icons[key];

  return (
    <span className={`${base} ${variants[key] || variants.healthy}`}>
      {Icon ? (
        <Icon size={16} className="inline-block mr-2" aria-hidden />
      ) : null}
      {children || status}
    </span>
  );
}