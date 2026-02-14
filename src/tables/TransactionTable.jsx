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
import { exportTransactionsPDF } from "../utils/exportTransactionPdf";
import Button from "../components/Button";
import toast from "react-hot-toast";

const TransactionTable = ({ linkId }) => {
  const [sorting, setSorting] = useState([]);

  const filteredTransactions = useMemo(
    () => transactions.filter((x) => x.linkId === linkId),
    [linkId],
  );

  const handleTransactions = () => {
    exportTransactionsPDF(filteredTransactions, linkId);
    toast.success("Exporting...");
  };

  const columns = [
    { accessorKey: "fullName", header: "Payer Name" },
    { accessorKey: "matricNo", header: "Matric No" },
    {
      accessorKey: "amountPaid",
      header: "Amount",
      cell: (info) => `₦${info.getValue().toLocaleString()}`,
    },
    { accessorKey: "status", header: "Status" },
    {
      accessorKey: "datePaid",
      header: "Date",
      cell: (info) => new Date(info.getValue()).toLocaleDateString("en-GB"),
    },
  ];

  const table = useReactTable({
    data: filteredTransactions,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 10 } },
  });

  const showPagination = filteredTransactions.length > 10;
  const hasTransactions = filteredTransactions.length > 0;

  return (
    <>
      <Table>
        {/* Only show table header if there are transactions */}
        {hasTransactions && (
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
        )}

        <TableBody>
          {!hasTransactions ? (
            <TableRow>
              <TableCell colSpan={columns.length} className="text-center py-10">
                <div className="flex flex-col items-center gap-2 text-gray-500">
                  {/* Optional icon */}
                  <svg
                    className="w-12 h-12 opacity-40"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 17v-6h6v6m-3-9V5m0 0H8m4 0h4"
                    />
                  </svg>
                  <p className="text-lg font-medium">No transactions yet</p>
                  <p className="text-sm text-gray-400">
                    Once payments are made, they will appear here.
                  </p>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            table.getRowModel().rows.map((row) => (
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
            ))
          )}
        </TableBody>
      </Table>

      {/* Pagination - only show if more than 10 transactions */}
      {showPagination && (
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
      )}

      {/* Export PDF button - only show if there are transactions */}
      {hasTransactions && (
        <div className="flex justify-end mt-2">
          <Button onClick={handleTransactions}>Export Pdf</Button>
        </div>
      )}
    </>
  );
};

export default TransactionTable;
