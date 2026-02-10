import React, { useMemo, useState } from "react";
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
  getPaginationRowModel,
} from "@tanstack/react-table";

import { transactions } from "../data/paymentTable";

const TransactionTable = ({ linkId }) => {
  const [sorting, setSorting] = useState([]);
  const filteredTransactions = useMemo(() => {
    return transactions.filter((x) => x.linkId === linkId);
  }, [linkId]);

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
    data: filteredTransactions,
    columns,
    state: {
      sorting, // tell TanStack the current sort
    },
    onSortingChange: setSorting, // callback when sort changes
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 10, // ✅ 10 per page
      },
    },
  });

  return (
    <>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className="cursor-pointer"
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
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {cell.column.id === "amountPaid"
                    ? `₦${cell.getValue().toLocaleString()}`
                    : cell.column.id === "datePaid"
                      ? new Date(cell.getValue()).toLocaleDateString("en-GB")
                      : cell.getValue()}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex items-center justify-between px-2 py-4">
        <div className="text-sm text-muted-foreground">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </div>

        <div className="flex items-center gap-2">
          <button
            className="border rounded px-3 py-1 text-sm disabled:opacity-50"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </button>

          <button
            className="border rounded px-3 py-1 text-sm disabled:opacity-50"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default TransactionTable;
