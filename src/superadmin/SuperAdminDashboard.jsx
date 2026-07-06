import React from "react";
import { useGetAdminDashboard } from "../hooks/useSuperAdmin";
import StatCardSkeleton from "../components/StatCardSkeleton";
import { Clock, Link, Wallet } from "lucide-react";
import StatCard from "../components/StatCard";

const SuperAdminDashboard = () => {
  const { data: dashboardData, isPending } = useGetAdminDashboard();

  const formattedAmount = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(dashboardData?.total_amount_received || 0);

  console.log(dashboardData, "dashboard data");
  return (
    <div className=" flex flex-col gap-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {isPending ? (
          <>
            <StatCardSkeleton />
            <StatCardSkeleton />
            <StatCardSkeleton />
          </>
        ) : (
          <>
            <StatCard
              title="Approved Users"
              description="All created payment links"
              value={dashboardData?.approved_users || 0}
              icon={Link}
            />
            <StatCard
              title="Pending verifications"
              description="All pending verifications"
              value={dashboardData?.pending_verifications}
              icon={Wallet}
              valueClassName="text-green-600"
            />
            <StatCard
              title="Total Users"
              description="All approved users"
              value={dashboardData?.total_users || 0}
              icon={Clock}
              valueClassName="text-blue-500"
            />
          </>
        )}
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
