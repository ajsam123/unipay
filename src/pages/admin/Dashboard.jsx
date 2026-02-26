import React from "react";
import StatCard from "../../components/StatCard";
import { Link, Wallet, Clock, AlertTriangle } from "lucide-react";
import RecentTransactions from "../../components/RecentTransactions";

const Dashboard = () => {
  return (
    <div className="">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Links"
          description="All created payment links"
          value="12"
          icon={Link}
        />

        <StatCard
          title="Total Collected"
          description="Successful payments"
          value="₦450,000"
          icon={Wallet}
          valueClassName="text-green-600"
          footer="+12% from last month"
        />

        <StatCard
          title="Pending"
          description="Awaiting payment"
          value="5"
          icon={Clock}
          valueClassName="text-yellow-500"
        />

        <StatCard
          title="Overdue"
          description="Past due date"
          value="2"
          icon={AlertTriangle}
          valueClassName="text-red-500"
        />
      </div>
      <div>
        <RecentTransactions />
      </div>
    </div>
  );
};

export default Dashboard;
