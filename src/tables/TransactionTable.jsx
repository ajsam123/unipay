import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";

import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";

import { transactions } from "../data/paymentTable";

const TransactionTable = () => {
  const [sorting, setSorting] = useState([]);
  const columns = [
    {
      accessorKey: "fullName",
      header: "Payer Name",
    },
    {
      accessorKey: "matricNo",
      header: "Matric No",
    },
    {
      accessorKey: "amountPaid",
      header: "Amount",
      cell: (info) => `₦${info.getValue().toLocaleString()}`,
    },
    {
      accessorKey: "status",
      header: "Status",
    },
    {
      accessorKey: "datePaid",
      header: "Date",
      cell: (info) => new Date(info.getValue()).toLocaleDateString("en-GB"),
    },
  ];

  const table = useReactTable({
    data: transactions,
    columns,
    state: {
      sorting, // tell TanStack the current sort
    },
    onSortingChange: setSorting, // callback when sort changes
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  console.log(table);

  return (
    <Table className="min-w-full border border-blue-500 rounded-lg overflow-hidden">
      <TableHeader className="bg-blue-500 text-white">
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <TableHead
                key={header.id}
                className="cursor-pointer px-4 py-2 text-left select-none"
                onClick={header.column.getToggleSortingHandler()}
              >
                {header.column.columnDef.header}
                {{
                  asc: " 🔼",
                  desc: " 🔽",
                }[header.column.getIsSorted()] ?? null}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>

      <TableBody>
        {table.getRowModel().rows.map((row) => (
          <TableRow key={row.id} className="hover:bg-blue-50 transition-colors">
            {row.getVisibleCells().map((cell) => {
              // Formatting special columns
              const value =
                cell.column.id === "amountPaid"
                  ? `₦${cell.getValue().toLocaleString()}`
                  : cell.column.id === "datePaid"
                    ? new Date(cell.getValue()).toLocaleDateString("en-GB")
                    : cell.getValue();

              // Status badge
              if (cell.column.id === "status") {
                const statusColor =
                  value === "success"
                    ? "bg-green-100 text-green-800"
                    : value === "pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800";

                return (
                  <TableCell key={cell.id} className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded-full text-sm font-medium ${statusColor}`}
                    >
                      {value}
                    </span>
                  </TableCell>
                );
              }

              // Amount right-aligned
              if (cell.column.id === "amountPaid") {
                return (
                  <TableCell key={cell.id} className="px-4 py-2 text-right">
                    {value}
                  </TableCell>
                );
              }

              // Other cells
              return (
                <TableCell key={cell.id} className="px-4 py-2">
                  {value}
                </TableCell>
              );
            })}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TransactionTable;
