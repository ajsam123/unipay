import { useState, memo } from "react";
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

import ActionModal from "../components/ActionModal";
import VerifyUserModal from "../components/VerifyUserModal";
import { useModalStore } from "../store/modalStore";
import { useGetPendingVerifications } from "../hooks/useSuperAdmin";

// ---------------- Row Actions ----------------
const RowActions = memo(({ user, openModal }) => {
  return (
    <ActionModal
      actions={[
        {
          label: "Review Verification",
          onClick: () =>
            openModal(VerifyUserModal, {
              userId: user.id,
            }),
        },
      ]}
    />
  );
});

// ---------------- Page ----------------
const SuperAdminVerification = () => {
  const [sorting, setSorting] = useState([]);
  const openModal = useModalStore((s) => s.openModal);

  const { data: users, isLoading } = useGetPendingVerifications();

  const formattedUsers =
    users?.map((user) => ({
      id: user.id,
      name: `${user.first_name} ${user.last_name}`,
      email: user.email,
      emailVerified: user.is_email_verified,
      idApproved: user.is_id_approved,
    })) || [];

  const columns = [
    {
      accessorKey: "name",
      header: "Name",
    },

    {
      accessorKey: "email",
      header: "Email",
    },

    {
      accessorKey: "emailVerified",
      header: "Email Verified",
      cell: (info) =>
        info.getValue() ? (
          <span className="text-green-600 font-medium">Yes</span>
        ) : (
          <span className="text-red-500 font-medium">No</span>
        ),
    },

    {
      accessorKey: "idApproved",
      header: "ID Status",
      cell: () => <span className="text-yellow-600 font-medium">Pending</span>,
    },

    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <RowActions user={row.original} openModal={openModal} />
      ),
    },
  ];

  const table = useReactTable({
    data: formattedUsers,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 10 } },
  });

  const showPagination = formattedUsers.length > 10;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* TABLE */}
      <Table>
        {/* HEADER */}
        {formattedUsers.length > 0 && (
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="bg-gray-50">
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className="cursor-pointer px-6 py-4 text-xs font-semibold uppercase text-gray-500 hover:bg-gray-100"
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

        {/* BODY */}
        <TableBody>
          {/* LOADING */}
          {isLoading && (
            <TableRow>
              <TableCell colSpan={columns.length} className="text-center py-16">
                Loading pending verifications...
              </TableCell>
            </TableRow>
          )}

          {/* EMPTY */}
          {!isLoading && formattedUsers.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="text-center py-20 text-gray-500"
              >
                No pending verifications
              </TableCell>
            </TableRow>
          )}

          {/* DATA */}
          {!isLoading &&
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} className="hover:bg-gray-50">
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className="px-6 py-4 text-sm"
                    onClick={(e) => {
                      if (cell.column.id === "actions") e.stopPropagation();
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
        </TableBody>
      </Table>

      {/* PAGINATION */}
      {showPagination && (
        <div className="flex items-center justify-between px-6 py-4 bg-gray-50 border-t">
          <div className="text-sm text-gray-500">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="px-4 py-2 border rounded-lg bg-white disabled:opacity-40"
            >
              Previous
            </button>

            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="px-4 py-2 border rounded-lg bg-white disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuperAdminVerification;
