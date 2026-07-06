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
import { useGetAllUsers } from "../hooks/useSuperAdmin.js";
import Button from "../components/Button.jsx";
import { useModalStore } from "../store/modalStore.js";
import SuperAdminUsersModal from "./SuperAdminUsersModal.jsx";

const SuperAdminUsers = () => {
  const [sorting, setSorting] = useState();
  const { openModal } = useModalStore((s) => s);

  const { data, isPending } = useGetAllUsers();

  const users = data?.results;

  const columns = [
    {
      accessorFn: (row) => `${row.first_name} ${row.last_name}`,
      id: "fullName",
      header: "Name",
    },

    {
      accessorKey: "email",
      header: "Email",
    },

    {
      accessorKey: "phone_number",
      header: "Phone Number",
    },

    {
      accessorKey: "role",
      header: "Role",
    },

    {
      accessorKey: "is_email_verified",
      header: "Email Verified",
    },

    {
      accessorKey: "is_id_approved",
      header: "ID Verified",
    },

    {
      accessorKey: "is_active",
      header: "Status",
    },

    {
      accessorKey: "created_at",
      header: "Joined",
    },
  ];

  const table = useReactTable({
    data: users ?? [],
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

  const showPagination = users?.length > 10;
  const hasUsers = users?.length > 0;

  // LOADING STATE
  if (isPending) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="space-y-4 animate-pulse">
          <div className="h-5 w-1/3 bg-gray-200 rounded"></div>

          <div className="h-12 w-full bg-gray-100 rounded-xl"></div>
          <div className="h-12 w-full bg-gray-100 rounded-xl"></div>
          <div className="h-12 w-full bg-gray-100 rounded-xl"></div>
          <div className="h-12 w-full bg-gray-100 rounded-xl"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-1 mb-2">
        <span className="body-large-semibold">All users</span>
        <span className="body-small-regular">View all users here</span>
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <Table>
          {/* ================= HEADER ================= */}
          {hasUsers && (
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
            {!hasUsers ? (
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

                    <p className="text-lg font-semibold">No users found</p>

                    <p className="text-sm text-gray-400">
                      Users will appear here once they are registered.
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
                    openModal(SuperAdminUsersModal, {
                      userId: row.original.id,
                    })
                  }
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="px-6 py-4 text-sm text-gray-700"
                    >
                      {/*  */}
                      {cell.column.id === "is_email_verified" ? (
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            cell.getValue()
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {cell.getValue() ? "Verified" : "Not Verified"}
                        </span>
                      ) : cell.column.id === "is_id_approved" ? (
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            cell.getValue()
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {cell.getValue() ? "Approved" : "Pending"}
                        </span>
                      ) : cell.column.id === "is_active" ? (
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            cell.getValue()
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {cell.getValue() ? "Active" : "Inactive"}
                        </span>
                      ) : cell.column.id === "created_at" ? (
                        new Date(cell.getValue()).toLocaleDateString("en-GB")
                      ) : (
                        (cell.getValue() ?? "-")
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
      </div>
    </>
  );
};

export default SuperAdminUsers;
