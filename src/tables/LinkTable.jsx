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

import { userLinks } from "../data/links";
import { useState } from "react";
import { routes } from "../constants/routes.js";
import Button from "../components/Button.jsx";
import { MoreVertical } from "lucide-react";
import { useModalStore } from "../store/modalStore.js";
import ActionModal from "../components/ActionModal.jsx";

const LinkTable = () => {
  const [sorting, setSorting] = useState([]);
  const navigate = useNavigate();
  const { openModal } = useModalStore((s) => s);

  const columns = [
    {
      accessorKey: "id",
      header: "Link ID",
    },
    {
      accessorKey: "dueName",
      header: "Due name",
    },
    {
      accessorKey: "amount",
      header: "Amount",
      cell: (info) => `₦${info.getValue().toLocaleString()}`,
    },
    {
      accessorKey: "link",
      header: "Link",
    },
    {
      accessorKey: "collected",
      header: "Total collected",
      cell: (info) => `₦${info.getValue().toLocaleString()}`,
    },
    {
      accessorKey: "payers",
      header: "Payers",
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const link = row.original;

        return (
          <ActionModal
            actions={[
              {
                label: "View",
                onClick: () =>
                  navigate({
                    to: routes.TRANSACTION,
                    params: { linkId: link.id },
                  }),
              },
              {
                label: "Edit",
                onClick: () => console.log("Edit", link.id),
              },
              {
                label: "Delete",
                color: "red",
                onClick: () => console.log("Delete", link.id),
              },
            ]}
          />
        );
      },
    },
  ];

  const table = useReactTable({
    data: userLinks,
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
          {table.getRowModel().rows.map((row) => {
            return (
              <TableRow
                key={row.id}
                onClick={() =>
                  navigate({
                    to: routes.TRANSACTION,
                    params: { linkId: row.original.id },
                  })
                }
                style={{ cursor: "pointer" }} // Added for better UX
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
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

export default LinkTable;
