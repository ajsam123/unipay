import React from "react";
import { X, Download } from "lucide-react";
import Button from "./Button";
import { useGetTransactionDetails } from "../hooks/useTransactions";

export default function TransactionDetailsModal({ transactionId, onClose }) {
  const { data, isLoading } = useGetTransactionDetails({
    id: transactionId,
  });

  if (isLoading) {
    return (
      <div className="space-y-4 p-4">
        <div className="h-6 w-40 bg-gray-200 rounded animate-pulse" />
        <div className="h-20 bg-gray-100 rounded animate-pulse" />
        <div className="h-20 bg-gray-100 rounded animate-pulse" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="py-10 text-center">
        Failed to load transaction details.
      </div>
    );
  }

  const details = [
    {
      label: "Reference",
      value: data.reference,
    },
    {
      label: "Student Name",
      value: `${data.first_name} ${data.last_name}`,
    },
    {
      label: "Matric Number",
      value: data.matric_number,
    },
    {
      label: "Amount Paid",
      value: new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
      }).format(Number(data.amount_paid)),
    },
    {
      label: "Date",
      value: new Date(data.paid_at).toLocaleString(),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-gray-900">
            Transaction Details
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            View complete payment information.
          </p>
        </div>
      </div>

      {/* Status */}
      <div>
        <span
          className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
            data.status === "success"
              ? "bg-green-100 text-green-700"
              : data.status === "pending"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-red-100 text-red-700"
          }`}
        >
          {data.status}
        </span>
      </div>

      {/* Details */}
      <div className="grid gap-4">
        {details.map((item) => (
          <div
            key={item.label}
            className="flex flex-col gap-1 border rounded-xl p-4"
          >
            <span className="text-xs uppercase text-gray-400">
              {item.label}
            </span>

            <span className="font-medium text-gray-900 break-all text-sm sm:text-base">
              {item.value}
            </span>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-2">
        <Button variant="stroke" onClick={onClose} className="w-full sm:w-auto">
          Close
        </Button>

        <Button className="w-full sm:w-auto">
          <Download size={16} />
          Download Receipt
        </Button>
      </div>
    </div>
  );
}
