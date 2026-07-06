import React from "react";
import { X, Download } from "lucide-react";
import { useGetUsersDetails } from "../hooks/useSuperAdmin";
import Button from "../components/Button";

export default function SuperAdminUsersModal({ userId, onClose }) {
  const { data, isLoading } = useGetUsersDetails({
    id: userId,
  });
  console.log(data);

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
    return <div className="py-10 text-center">Failed to load user Details</div>;
  }

  const details = [
    {
      label: "Full Name",
      value: `${data.first_name} ${data.last_name}`,
    },
    {
      label: "Email",
      value: data.email || "-",
    },
    {
      label: "Phone Number",
      value: data.phone_number || "-",
    },
    {
      label: "University",
      value: data.university_name || "-",
    },
    {
      label: "Department",
      value: data.department || "-",
    },
    {
      label: "Matric Number",
      value: data.matric_number || "-",
    },
    {
      label: "Role",
      value: data.role,
    },
    {
      label: "Bank Name",
      value: data.bank_name || "-",
    },
    {
      label: "Account Name",
      value: data.account_name || "-",
    },
    {
      label: "Account Number",
      value: data.account_number || "-",
    },
    {
      label: "Subaccount Code",
      value: data.subaccount_code || "-",
    },
    {
      label: "Created At",
      value: new Date(data.created_at).toLocaleString(),
    },
    {
      label: "Last Updated",
      value: new Date(data.updated_at).toLocaleString(),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-gray-900">
            Admin Details
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            View complete administrator information.
          </p>
        </div>
      </div>

      {/* Status */}
      <div className="flex flex-wrap gap-2">
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            data.is_active
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {data.is_active ? "Active" : "Inactive"}
        </span>

        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            data.is_email_verified
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {data.is_email_verified ? "Email Verified" : "Email Not Verified"}
        </span>

        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            data.is_id_approved
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {data.is_id_approved ? "ID Approved" : "ID Pending"}
        </span>
      </div>

      {/* Details */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">
          Personal Information
        </h3>

        <div className="grid md:grid-cols-2 gap-4">
          <DetailCard
            label="Full Name"
            value={`${data?.first_name} ${data.last_name}`}
          />

          <DetailCard label="Email" value={data.email} />

          <DetailCard label="Phone Number" value={data.phone_number} />

          <DetailCard label="University" value={data.university_name || "-"} />

          <DetailCard label="Department" value={data.department || "-"} />

          <DetailCard label="Matric Number" value={data.matric_number || "-"} />
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-gray-900 mb-3">Bank Information</h3>

        <div className="grid md:grid-cols-2 gap-4">
          <DetailCard label="Bank Name" value={data.bank_name || "-"} />

          <DetailCard label="Account Name" value={data.account_name || "-"} />

          <DetailCard
            label="Account Number"
            value={data.account_number || "-"}
          />

          <DetailCard
            label="Subaccount Code"
            value={data.subaccount_code || "-"}
          />
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-gray-900 mb-3">
          Verification & Account
        </h3>

        <div className="grid md:grid-cols-2 gap-4">
          <DetailCard label="Role" value={data.role} />

          <DetailCard
            label="Created At"
            value={new Date(data.created_at).toLocaleString()}
          />

          <DetailCard
            label="Last Updated"
            value={new Date(data.updated_at).toLocaleString()}
          />

          <DetailCard
            label="School ID"
            value={
              data.school_id_url ? (
                <a
                  href={data.school_id_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  View Uploaded ID
                </a>
              ) : (
                "-"
              )
            }
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-2">
        <Button variant="stroke" onClick={onClose}>
          Close
        </Button>
      </div>
    </div>
  );
}
const DetailCard = ({ label, value }) => (
  <div className="border rounded-xl p-4">
    <p className="text-xs uppercase text-gray-400 mb-1">{label}</p>

    <div className="font-medium text-gray-900 break-all">{value}</div>
  </div>
);
