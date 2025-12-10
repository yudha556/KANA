import Card from "@/components/ui/teacher/card";
import BorderCard from "@/components/ui/borderCard";
import StatusBadge from "@/components/ui/statusBadge";
import { EllipsisVertical, FileText } from "lucide-react";
import { useDashboardData } from "../hooks/useDashboard.hooks";

export default function Material() {
  const { data, loading, error, refetch } = useDashboardData();
  const { materials } = data;

  if (loading) {
    return <p className="p-6 text-gray-500">Loading materials...</p>;
  }

  if (error) {
    return (
      <div className="p-6 text-red-500">
        Gagal load: {error}{" "}
        <button
          onClick={refetch}
          className="ml-2 px-3 py-1 bg-indigo-500 text-white rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="w-full">
      <Card>
        <div className="w-full flex flex-col gap-8 px-6 py-3 md:py-4">
          <p className="text-xl md:text-2xl font-normal">Your Material</p>

          {materials.length === 0 ? (
            <p className="text-gray-500">Belum ada material.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6  overflow-y-auto scrollbar-modern">
              {materials.map((mat, idx) => (
                <BorderCard
                  key={idx}
                  className="hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex flex-col px-2 lg:px-4 py-3 lg:py-5">
                    {/* Header */}
                    <div className="flex justify-between items-start mb-4 md:mb-5 lg:mb-8">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex justify-center items-center">
                          <FileText size={20} className="text-gray-600" />
                        </div>
                        <div className="flex flex-col">
                          <p className="text-base font-medium text-gray-900 leading-tight">
                            {mat.title || "Untitled"}
                          </p>
                          <p className="text-sm text-gray-500 mt-1">
                            {/* kalau memang nggak ada createdAt, bisa kosong atau pakai id/time lain */}
                          </p>

                          <p className="text-sm text-gray-500 mt-1">
                            {mat.createdAt
                              ? `Created ${new Date(
                                  mat.createdAt
                                ).toLocaleDateString()}`
                              : ""}
                          </p>
                        </div>
                      </div>
                      <div className="w-8 h-8 rounded-lg cursor-pointer flex items-center justify-center hover:bg-gray-100 transition-colors">
                        <EllipsisVertical size={16} className="text-gray-500" />
                      </div>
                    </div>

                    {/* Status */}
                    <div className="w-full mt-3 md:mt-0">
                      <StatusBadge
                        status={mat.status || "Ready"}
                        progress={mat.progress}
                      />
                    </div>
                  </div>
                </BorderCard>
              ))}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}