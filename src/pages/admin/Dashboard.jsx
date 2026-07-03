import React from "react";
import StatCard from "../../components/StatCard";
import { Link, Wallet, Clock, AlertTriangle } from "lucide-react";
import RecentTransactions from "../../components/RecentTransactions";
import AllTransactionTable from "../../tables/AllTransactionTable";
import { useGetDashboard } from "../../hooks/useDashboard";
import StatCardSkeleton from "../../components/StatCardSkeleton";

const Dashboard = () => {
  const { data: dashboardData, isLoading } = useGetDashboard();

  const formattedAmount = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(dashboardData?.total_amount_received || 0);

  console.log(dashboardData, "dashboard data");
  return (
    <div className=" flex flex-col gap-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {isLoading ? (
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

      <div>
        <AllTransactionTable
          transactions={dashboardData?.recent_transactions}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default Dashboard;
