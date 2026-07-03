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
              title="Total Links"
              description="All created payment links"
              value={dashboardData?.total_links || 0}
              icon={Link}
            />
            <StatCard
              title="Total Collected"
              description="Successful payments"
              value={formattedAmount}
              icon={Wallet}
              valueClassName="text-green-600"
            />
            <StatCard
              title="Total Transactions"
              description="All transactions"
              value={dashboardData?.total_transaction || 0}
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
