import { useNavigate } from "@tanstack/react-router";
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
  flexRender,
} from "@tanstack/react-table";

import { useState } from "react";
import { routes } from "../constants/routes.js";
import Button from "../components/Button.jsx";
import { MoreVertical } from "lucide-react";
import ActionModal from "../components/ActionModal.jsx";
import useLinkStore from "../store/useLinkStore.js";
import DeleteLinkModal from "../components/DeleteLinkModal.jsx";
import { useModalStore } from "../store/modalStore.js";
import toast from "react-hot-toast";

const LinkTable = () => {
  const [sorting, setSorting] = useState([]);
  const navigate = useNavigate();
  const { links } = useLinkStore((s) => s);
  const { openModal } = useModalStore((s) => s);

  const columns = [
    { accessorKey: "id", header: "Link ID" },
    { accessorKey: "dueName", header: "Due name" },
    {
      accessorKey: "amount",
      header: "Amount",
      cell: (info) => `₦${info.getValue().toLocaleString()}`,
    },
    { accessorKey: "link", header: "Link" },
    {
      accessorKey: "collected",
      header: "Total collected",
      cell: (info) => `₦${info.getValue().toLocaleString()}`,
    },
    { accessorKey: "payers", header: "Payers" },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const link = row.original;
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
                onClick: () =>
                  openModal({
                    content: <DeleteLinkModal linkId={link.id} />,
                  }),
              },
            ]}
          />
        );
      },
    },
  ];

  const table = useReactTable({
    data: links,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 10 } },
  });

  const showPagination = links.length > 10;

  return (
    <>
      <Table>
        {links.length > 0 && (
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
          {links.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length} className="text-center py-10">
                <div className="flex flex-col items-center gap-2 text-gray-500">
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
                  <p className="text-lg font-medium">No links yet</p>
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
                onClick={() =>
                  navigate({
                    to: routes.TRANSACTION,
                    params: { linkId: row.original.id },
                  })
                }
                style={{ cursor: "pointer" }}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

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
    </>
  );
};

export default LinkTable;
