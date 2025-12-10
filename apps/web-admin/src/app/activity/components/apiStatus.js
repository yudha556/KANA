import { Card, StatusBadge } from "@/components/ui";
import { Database } from "lucide-react";

export default function ApiStatus() {
    return (
        <div className="flex flex-col w-full gap-3">
            <div className="flex flex-row gap-2">
                <Database size={30} />
                <h1 className="font-semibold text-2xl">API Service Status</h1>
            </div>

            <div className="flex flex-col gap-1">
                <Card className="flex flex-row items-center justify-between">
                    <div className="flex flex-row gap-4  items-center">
                        <StatusBadge status="warning" />
                        <h2 className="font-semibold text-lg">API Gateway</h2>
                    </div>

                    <div className="flex flex-col gap-1 ">
                        <h3 className="font-semibold text-lg">112ms</h3>
                        <p className="text-sm text-subtext">Response Time</p>
                    </div>
                </Card>
                <Card className="flex flex-row items-center justify-between">
                    <div className="flex flex-row gap-4  items-center">
                        <StatusBadge status="error" />
                        <h2 className="font-semibold text-lg">API Gateway</h2>
                    </div>

                    <div className="flex flex-col gap-1 ">
                        <h3 className="font-semibold text-lg">112ms</h3>
                        <p className="text-sm text-subtext">Response Time</p>
                    </div>
                </Card>
                <Card className="flex flex-row items-center justify-between">
                    <div className="flex flex-row gap-4  items-center">
                        <StatusBadge status="healthy" />
                        <h2 className="font-semibold text-lg">API Gateway</h2>
                    </div>

                    <div className="flex flex-col gap-1 ">
                        <h3 className="font-semibold text-lg">112ms</h3>
                        <p className="text-sm text-subtext">Response Time</p>
                    </div>
                </Card>
            </div>
        </div>
    )
}