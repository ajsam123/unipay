import React, { useMemo, useState } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  Banknote,
  CheckCircle2,
  Clock,
  Hourglass,
  ListChecks,
  UserCheck,
  Users,
  UserX,
  Wallet,
  XCircle,
} from "lucide-react";
import { useGetAdminDashboard } from "../hooks/useSuperAdmin";
import StatCardSkeleton from "../components/StatCardSkeleton";
import StatCard from "../components/StatCard";

/* -------------------- Helpers -------------------- */
const formatNaira = (amount) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(amount ?? 0);

const formatDate = (date) =>
  date
    ? new Intl.DateTimeFormat("en-NG", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }).format(new Date(date))
    : "—";

const statusStyles = {
  approved: "bg-green-100 text-green-700",
  completed: "bg-green-100 text-green-700",
  pending: "bg-yellow-100 text-yellow-700",
  rejected: "bg-red-100 text-red-700",
  failed: "bg-red-100 text-red-700",
};

const statusColors = {
  approved: "#22c55e",
  completed: "#22c55e",
  pending: "#eab308",
  rejected: "#ef4444",
  failed: "#ef4444",
};

const getColor = (status) => statusColors[status?.toLowerCase()] || "#9ca3af";

/* -------------------- Small components -------------------- */
const StatusBadge = ({ status }) => (
  <span
    className={`rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${
      statusStyles[status?.toLowerCase()] || "bg-gray-100 text-gray-700"
    }`}
  >
    {status}
  </span>
);

const Section = ({ title, children }) => (
  <section className="flex flex-col gap-3">
    <h2 className="text-lg font-semibold">{title}</h2>
    {children}
  </section>
);

const ChartCard = ({ title, isEmpty, emptyText, isPending, children }) => (
  <div className="flex flex-col gap-4 rounded-xl border border-gray-200 p-4 dark:border-neutral-700">
    <p className="font-semibold">{title}</p>

    <div className="h-64 w-full">
      {isPending ? (
        <div className="h-full w-full animate-pulse rounded-lg bg-gray-100 dark:bg-neutral-800" />
      ) : isEmpty ? (
        <div className="flex h-full items-center justify-center text-sm text-gray-500">
          {emptyText}
        </div>
      ) : (
        children
      )}
    </div>
  </div>
);

/* -------------------- Users table (TanStack) -------------------- */
const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor("name", {
    header: "Name",
    cell: (info) => <span className="font-medium">{info.getValue()}</span>,
  }),
  columnHelper.accessor("email", {
    header: "Email",
  }),
  columnHelper.accessor("organization", {
    header: "Organization",
    cell: (info) => info.getValue() || "—",
  }),
  columnHelper.accessor("status", {
    header: "Status",
    cell: (info) => <StatusBadge status={info.getValue()} />,
  }),
  columnHelper.accessor("created_at", {
    header: "Joined",
    cell: (info) => formatDate(info.getValue()),
  }),
];

const RecentUsersTable = ({ data, isPending }) => {
  const [sorting, setSorting] = useState([]);

  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const colSpan = columns.length;

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-neutral-700">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead className="bg-gray-50 text-gray-600 dark:bg-neutral-800 dark:text-neutral-400">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const sorted = header.column.getIsSorted();

                return (
                  <th key={header.id} className="px-4 py-3 font-medium">
                    <button
                      type="button"
                      onClick={header.column.getToggleSortingHandler()}
                      className="flex items-center gap-1.5"
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                      {sorted === "asc" ? (
                        <ArrowUp size={14} />
                      ) : sorted === "desc" ? (
                        <ArrowDown size={14} />
                      ) : (
                        <ArrowUpDown size={14} className="opacity-40" />
                      )}
                    </button>
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>

        <tbody>
          {isPending ? (
            <tr>
              <td
                colSpan={colSpan}
                className="px-4 py-6 text-center text-gray-500"
              >
                Loading...
              </td>
            </tr>
          ) : table.getRowModel().rows.length === 0 ? (
            <tr>
              <td
                colSpan={colSpan}
                className="px-4 py-6 text-center text-gray-500"
              >
                No recent users.
              </td>
            </tr>
          ) : (
            table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="border-t border-gray-200 dark:border-neutral-700"
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-3">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

/* -------------------- Dashboard -------------------- */
const SuperAdminDashboard = () => {
  const { data: dashboardData, isPending } = useGetAdminDashboard();

  const stats = dashboardData?.stats;
  const usersByStatus = dashboardData?.users_by_status ?? [];
  const payoutsByStatus = dashboardData?.payouts_by_status ?? [];
  const recentUsers = useMemo(
    () => dashboardData?.recent_users ?? [],
    [dashboardData],
  );

  const payoutAmountData = [
    { name: "Completed", value: stats?.completed_payout_amount ?? 0 },
    { name: "Pending", value: stats?.pending_payout_amount ?? 0 },
    { name: "Failed", value: stats?.failed_payout_amount ?? 0 },
  ];

  const usersTotal = usersByStatus.reduce((sum, i) => sum + (i.count ?? 0), 0);
  const payoutsTotal = payoutsByStatus.reduce(
    (sum, i) => sum + (i.count ?? 0),
    0,
  );
  const amountTotal = payoutAmountData.reduce((sum, i) => sum + i.value, 0);

  const userCards = [
    {
      title: "Total Users",
      description: "All registered users",
      value: stats?.total_users ?? 0,
      icon: Users,
      valueClassName: "text-blue-500",
    },
    {
      title: "Approved Users",
      description: "Users with approved ID",
      value: stats?.approved_users ?? 0,
      icon: UserCheck,
      valueClassName: "text-green-600",
    },
    {
      title: "Pending Verifications",
      description: "Users awaiting approval",
      value: stats?.pending_verifications ?? 0,
      icon: Clock,
      valueClassName: "text-yellow-600",
    },
    {
      title: "Rejected Users",
      description: "Users whose ID was rejected",
      value: stats?.rejected_users ?? 0,
      icon: UserX,
      valueClassName: "text-red-500",
    },
  ];

  const payoutCountCards = [
    {
      title: "Total Payouts",
      description: "All payout requests",
      value: stats?.total_payouts ?? 0,
      icon: ListChecks,
      valueClassName: "text-blue-500",
    },
    {
      title: "Completed Payouts",
      description: "Successfully paid out",
      value: stats?.completed_payouts ?? 0,
      icon: CheckCircle2,
      valueClassName: "text-green-600",
    },
    {
      title: "Pending Payouts",
      description: "Awaiting processing",
      value: stats?.pending_payouts ?? 0,
      icon: Hourglass,
      valueClassName: "text-yellow-600",
    },
    {
      title: "Failed Payouts",
      description: "Payouts that failed",
      value: stats?.failed_payouts ?? 0,
      icon: XCircle,
      valueClassName: "text-red-500",
    },
  ];

  const payoutAmountCards = [
    {
      title: "Total Payout Amount",
      description: "Sum of all payouts",
      value: formatNaira(stats?.total_payout_amount),
      icon: Wallet,
      valueClassName: "text-blue-500",
    },
    {
      title: "Completed Amount",
      description: "Total paid out",
      value: formatNaira(stats?.completed_payout_amount),
      icon: Banknote,
      valueClassName: "text-green-600",
    },
    {
      title: "Pending Amount",
      description: "Awaiting processing",
      value: formatNaira(stats?.pending_payout_amount),
      icon: Banknote,
      valueClassName: "text-yellow-600",
    },
    {
      title: "Failed Amount",
      description: "Total of failed payouts",
      value: formatNaira(stats?.failed_payout_amount),
      icon: Banknote,
      valueClassName: "text-red-500",
    },
  ];

  const renderCards = (cards) => (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {isPending
        ? cards.map((card) => <StatCardSkeleton key={card.title} />)
        : cards.map((card) => <StatCard key={card.title} {...card} />)}
    </div>
  );

  return (
    <div className="flex flex-col gap-8">
      <Section title="Users">{renderCards(userCards)}</Section>

      <Section title="Payouts">{renderCards(payoutCountCards)}</Section>

      <Section title="Payout amounts">{renderCards(payoutAmountCards)}</Section>

      <Section title="Overview">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* Users by status: donut */}
          <ChartCard
            title="Users by status"
            isPending={isPending}
            isEmpty={usersTotal === 0}
            emptyText="No users yet."
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={usersByStatus}
                  dataKey="count"
                  nameKey="status"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={2}
                >
                  {usersByStatus.map((item) => (
                    <Cell key={item.status} fill={getColor(item.status)} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Payouts by status: bar */}
          <ChartCard
            title="Payouts by status"
            isPending={isPending}
            isEmpty={payoutsTotal === 0}
            emptyText="No payouts yet."
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={payoutsByStatus}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="status" tickLine={false} axisLine={false} />
                <YAxis
                  allowDecimals={false}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip />
                <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                  {payoutsByStatus.map((item) => (
                    <Cell key={item.status} fill={getColor(item.status)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Payout amounts: bar */}
          <ChartCard
            title="Payout amounts"
            isPending={isPending}
            isEmpty={amountTotal === 0}
            emptyText="No payout amounts yet."
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={payoutAmountData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tickLine={false} axisLine={false} />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(v) =>
                    new Intl.NumberFormat("en-NG", {
                      notation: "compact",
                    }).format(v)
                  }
                />
                <Tooltip formatter={(value) => formatNaira(value)} />
                <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                  {payoutAmountData.map((item) => (
                    <Cell key={item.name} fill={getColor(item.name)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
      </Section>

      <Section title="Recent users">
        <RecentUsersTable data={recentUsers} isPending={isPending} />
      </Section>
    </div>
  );
};

export default SuperAdminDashboard;
