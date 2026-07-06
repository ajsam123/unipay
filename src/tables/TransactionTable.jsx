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
  getPaginationRowModel,
} from "@tanstack/react-table";

import { exportTransactionsPDF } from "../utils/exportTransactionPdf.js";
import Button from "../components/Button.jsx";
import toast from "react-hot-toast";
import { useGetTransactionsByLink } from "../hooks/useTransactions.js";
import { useModalStore } from "../store/modalStore.js";
import TransactionDetailsModal from "../components/TransactionDetailsModal.jsx";
import { ChevronRight } from "lucide-react";

const TransactionTable = ({ linkId }) => {
  const [sorting, setSorting] = useState([]);

  const { data: transactions, isLoading: transactionLoading } =
    useGetTransactionsByLink({
      id: linkId,
    });

  const openModal = useModalStore((s) => s.openModal);
  const transactionData = transactions?.results || [];

  console.log(transactionData);

  const handleTransactions = () => {
    exportTransactionsPDF(transactionData, linkId);
    toast.success("Exporting PDF...");
  };

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
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  const showPagination = transactionData.length > 10;
  const hasTransactions = transactionData.length > 0;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <Table>
        {/* ================= HEADER ================= */}
        {hasTransactions && (
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="bg-gray-50 cursor-pointer
    hover:bg-gray-50
    active:bg-gray-100
    transition"
              >
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className="cursor-pointer px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500 hover:bg-gray-100 transition"
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

        {/* ================= BODY ================= */}
        <TableBody>
          {!hasTransactions ? (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="text-center bg-gray-50 py-20"
              >
                <div className="flex flex-col items-center gap-3 text-gray-500">
                  <svg
                    className="w-16 h-16 opacity-30"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 17v-6h6v6m-3-9V5m0 0H8m4 0h4"
                    />
                  </svg>

                  <p className="text-lg font-semibold">No transactions yet</p>

                  <p className="text-sm text-gray-400">
                    Once payments are made, they will appear here.
                  </p>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                className="hover:bg-gray-100 transition duration-200 cursor-pointer"
                onClick={() =>
                  openModal(TransactionDetailsModal, {
                    transactionId: row.original.id,
                  })
                }
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className="px-6 py-4 text-sm text-gray-700"
                  >
                    {/* AMOUNT */}
                    {cell.column.id === "amount_paid" ? (
                      <span className="font-semibold text-gray-900">
                        {new Intl.NumberFormat("en-NG", {
                          style: "currency",
                          currency: "NGN",
                        }).format(Number(cell.getValue()))}
                      </span>
                    ) : /* DATE */
                    cell.column.id === "paid_at" ? (
                      new Date(cell.getValue()).toLocaleDateString("en-GB")
                    ) : /* STATUS */
                    cell.column.id === "status" ? (
                      <span
                        className={`px-3 py-1 text-xs font-medium rounded-full ${
                          cell.getValue() === "success"
                            ? "bg-green-100 text-green-700"
                            : cell.getValue() === "pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                        }`}
                      >
                        {cell.getValue().charAt(0).toUpperCase() +
                          cell.getValue().slice(1)}
                      </span>
                    ) : (
                      /* DEFAULT */
                      cell.getValue()
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {/* ================= PAGINATION ================= */}
      {showPagination && (
        <div className="flex items-center justify-between px-6 py-4 bg-gray-50 border-t">
          <div className="text-sm text-gray-500">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="px-4 py-2 text-sm font-medium bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-40 transition"
            >
              Previous
            </button>

            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="px-4 py-2 text-sm font-medium bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-40 transition"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* ================= EXPORT BUTTON ================= */}
      {hasTransactions && (
        <div className="flex justify-end px-6 py-4 border-t bg-white">
          <Button
            onClick={handleTransactions}
            className="rounded-xl px-5 py-2 shadow-sm"
          >
            Export PDF
          </Button>
        </div>
      )}
    </div>
  );
};

export default TransactionTable;
