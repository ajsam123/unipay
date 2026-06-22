// LinkTable.jsx
import { useNavigate } from "@tanstack/react-router";
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
  flexRender,
} from "@tanstack/react-table";

import { useState, memo } from "react";
import { routes } from "../constants/routes.js";
import ActionModal from "../components/ActionModal.jsx";
import DeleteLinkModal from "../components/DeleteLinkModal.jsx";
import { useModalStore } from "../store/modalStore.js";
import toast from "react-hot-toast";
import { useGetLinks } from "../hooks/useLinks.js";

// ---------------- Row Actions ----------------
const RowActions = memo(({ link, navigate, openModal }) => {
  return (
    <ActionModal
      actions={[
        {
          label: "View Transactions",
          onClick: () =>
            navigate({
              to: routes.TRANSACTION,
              params: { linkId: link.id },
            }),
        },
        {
          label: "Copy Link",
          onClick: () => {
            navigator.clipboard.writeText(link.link);
            toast.success("Link copied to clipboard");
          },
        },
        {
          label: "Delete",
          color: "red",
          onClick: () => {
            openModal(DeleteLinkModal, { linkId: link.id });
          },
        },
      ]}
    />
  );
});

// ---------------- Link Table ----------------
const LinkTable = () => {
  const [sorting, setSorting] = useState([]);

  const navigate = useNavigate();

  const { data: links, isLoading } = useGetLinks();

  const openModal = useModalStore((s) => s.openModal);

  const formattedLinks =
    links?.map((link) => ({
      id: link.id,
      dueName: link.title,
      amount: Number(link.amount_per_student),
      link: link.payment_link,
      collected: Number(link.total_amount_collected),
      payers: link.total_student_paid,
    })) || [];

  const columns = [
    {
      accessorKey: "dueName",
      header: "Due Name",
    },

    {
      accessorKey: "amount",
      header: "Amount",

      cell: (info) => (
        <span className="font-semibold text-gray-900">
          ₦{info.getValue().toLocaleString()}
        </span>
      ),
    },

    {
      accessorKey: "link",
      header: "Link",

      cell: (info) => (
        <div className="max-w-[220px] truncate text-blue-600">
          {info.getValue()}
        </div>
      ),
    },

    {
      accessorKey: "collected",
      header: "Total Collected",

      cell: (info) => (
        <span className="font-medium text-gray-800">
          ₦{info.getValue().toLocaleString()}
        </span>
      ),
    },

    {
      accessorKey: "payers",
      header: "Payers",
    },

    {
      id: "actions",
      header: "Actions",

      cell: ({ row }) => (
        <RowActions
          link={row.original}
          navigate={navigate}
          openModal={openModal}
        />
      ),
    },
  ];

  const table = useReactTable({
    data: formattedLinks,
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

  const showPagination = formattedLinks.length > 10;

  // ================= LOADING STATE =================
  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="animate-pulse">
          {/* Header Skeleton */}
          <div className="grid grid-cols-6 gap-4 px-6 py-4 bg-gray-50 border-b">
            <div className="h-4 bg-gray-200 rounded w-24"></div>

            <div className="h-4 bg-gray-200 rounded w-20"></div>

            <div className="h-4 bg-gray-200 rounded w-32"></div>

            <div className="h-4 bg-gray-200 rounded w-28"></div>

            <div className="h-4 bg-gray-200 rounded w-16"></div>

            <div className="h-4 bg-gray-200 rounded w-20"></div>
          </div>

          {/* Row Skeletons */}
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="grid grid-cols-6 gap-4 px-6 py-5 border-b border-gray-100"
            >
              <div className="h-4 bg-gray-100 rounded w-28"></div>

              <div className="h-4 bg-gray-100 rounded w-16"></div>

              <div className="h-4 bg-gray-100 rounded w-full"></div>

              <div className="h-4 bg-gray-100 rounded w-24"></div>

              <div className="h-8 bg-gray-100 rounded-xl w-12"></div>

              <div className="h-8 bg-gray-100 rounded-xl w-10"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <Table>
        {/* ================= HEADER ================= */}
        {formattedLinks.length > 0 && (
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="bg-gray-50">
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className="cursor-pointer px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500 hover:bg-gray-100 transition"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}

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
          {formattedLinks.length === 0 ? (
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

                  <p className="text-lg font-semibold">No links yet</p>

                  <p className="text-sm text-gray-400">
                    Create a payment link to see it appear here.
                  </p>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                className="hover:bg-gray-50 transition duration-200 cursor-pointer"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className="px-6 py-4 text-sm text-gray-700"
                    onClick={(e) => {
                      if (cell.column.id === "actions") {
                        e.stopPropagation();
                      }
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
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
    </div>
  );
};

export default LinkTable;
