import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table.jsx";

import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";

import { useGetTransactions } from "../hooks/useTransactions.js";

const AllTransactionTable = ({ linkId }) => {
  const [sorting, setSorting] = useState([]);

  const { data: transactions, isLoading } = useGetTransactions();

  const transactionData = (transactions || []).slice(0, 10); // ✅ HARD LIMIT 10

  const columns = [
    {
      accessorFn: (row) => `${row.first_name} ${row.last_name}`,
      id: "fullName",
      header: "Payer Name",
    },

    {
      accessorKey: "matric_number",
      header: "Matric No",
    },

    {
      accessorKey: "amount_paid",
      header: "Amount",
    },

    {
      accessorKey: "status",
      header: "Status",
    },

    {
      accessorKey: "paid_at",
      header: "Date",
    },
  ];

  const table = useReactTable({
    data: transactionData,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const hasTransactions = transactionData.length > 0;

  // ================= LOADING STATE =================
  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="animate-pulse p-6 space-y-4">
          <div className="h-5 w-48 bg-gray-200 rounded"></div>

          <div className="grid grid-cols-5 gap-4 bg-gray-50 p-4 rounded">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
          </div>

          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="grid grid-cols-5 gap-4">
              <div className="h-4 bg-gray-100 rounded"></div>
              <div className="h-4 bg-gray-100 rounded"></div>
              <div className="h-4 bg-gray-100 rounded"></div>
              <div className="h-4 bg-gray-100 rounded"></div>
              <div className="h-4 bg-gray-100 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden p-4">
      {/* ✅ TITLE */}
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Recent Transactions
      </h2>

      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="bg-gray-50">
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500"
                >
                  {header.column.columnDef.header}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {!hasTransactions ? (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="text-center py-10 text-gray-500"
              >
                No recent transactions
              </TableCell>
            </TableRow>
          ) : (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} className="hover:bg-gray-50">
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className="px-6 py-4 text-sm text-gray-700"
                  >
                    {cell.column.id === "amount_paid" ? (
                      <span className="font-semibold text-gray-900">
                        {new Intl.NumberFormat("en-NG", {
                          style: "currency",
                          currency: "NGN",
                        }).format(Number(cell.getValue()))}
                      </span>
                    ) : cell.column.id === "paid_at" ? (
                      new Date(cell.getValue()).toLocaleDateString("en-GB")
                    ) : cell.column.id === "status" ? (
                      <span
                        className={`px-3 py-1 text-xs rounded-full ${
                          cell.getValue() === "success"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {cell.getValue()}
                      </span>
                    ) : (
                      cell.getValue()
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AllTransactionTable;
