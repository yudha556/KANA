// complete, progress, failed

export default function ProgressStatus({ status }) {
  const statusStyles = {
    Completed: "bg-[#DCFCE7] text-[#16A34A]",
    InProgress: "bg-[#FEF9C3] text-[#CA8A04]",
    Failed: "bg-[#FEE2E2] text-[#DC2626]",
  };

  const style = statusStyles[status] || "bg-gray-200 text-gray-700";

  return (
    <div
      className={`flex flex-row gap-2 items-center rounded-lg py-1 px-4 ${style}`}
    >
      <p className="text-sm font-semibold">{status}</p>
    </div>
  );
}