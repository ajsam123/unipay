import React, { useEffect } from "react";
import Logo from "../../components/Logo";
import Button from "../../components/Button";
import {
  CircleCheckBig,
  CalendarDays,
  Download,
  Hash,
  Mail,
  User,
  ArrowLeft,
  LoaderCircle,
} from "lucide-react";
import { Link, useSearch } from "@tanstack/react-router";
import { routes } from "../../constants/routes";
import {
  useDownloadReceipt,
  useVerifyPayment,
} from "../../hooks/usePaymentPage";
import toast from "react-hot-toast";

const SuccessPage = () => {
  const { reference } = useSearch({
    from: routes.PAYMENTSUCCESSPAGE,
  });

  /// Verify Payment Mutation
  const {
    mutate: verifyPaymentMutate,
    data,
    isPending,
    isError,
  } = useVerifyPayment();

  // Download receipt Mutation
  const { mutate: downloadReceiptMutate, isPending: downloading } =
    useDownloadReceipt();

  // Downloading receipt function
  const handleDownloadReceipt = () => {
    downloadReceiptMutate(
      { reference },
      {
        // blob - Binary Large Object(A javascript object representing raw file data)
        onSuccess: (blob) => {
          // Create a temporary url that points to the Blob
          const url = window.URL.createObjectURL(blob);

          // Creates an invisible temporary link <a></a>
          const link = document.createElement("a");

          // Tells the link where it should point - instead of pointing to google or another website - it points to our pdf
          link.href = url;

          // Tells the browser to download it and not open it, it also specifies the filename

          link.download = `receipt-${reference}.pdf`;

          // This line temporarily adds it to the page (It is still invisible)
          document.body.appendChild(link);

          // Instead of waitong for the user to click the link, which is not feasible - Javascript clicks the link
          link.click();

          // Once the download has started, we remove the invisible link
          link.remove();

          // It removes the temporary url that was created
          window.URL.revokeObjectURL(url);

          toast.success("Receipt Downloaded");
        },
      },
    );
  };
  const formatDate = (dateString) => {
    if (!dateString) return "";

    return new Intl.DateTimeFormat("en-NG", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).format(new Date(dateString));
  };

  useEffect(() => {
    if (!reference) return;

    verifyPaymentMutate({ reference });
  }, [reference, verifyPaymentMutate]);

  const payment = data;

  const amountFormatter = (amount) => {
    if (amount == null) return "";
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(amount);
  };

  if (isPending) {
    return (
      <div>
        <section className="min-h-screen flex items-center justify-center bg-white">
          <div>
            <LoaderCircle size={52} className="animate-spin text-primary" />
          </div>
          <span className="text-gray-500 text-sm">
            Verifying your payment....
          </span>
        </section>
      </div>
    );
  }

  if (isError) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-600">
            Payment verification failed
          </h2>

          <p className="mt-2 text-gray-500">
            We couldn't verify your payment. Please contact support if you've
            already been charged.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-linear-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center md:px-4 py-6 md:py-10">
      <div className="w-full max-w-lg">
        <div className="bg-white/60 backdrop-blur-xl border border-white/40 rounded-3xl shadow-xl p-4 md:p-8">
          {/* Logo */}
          <div className="flex justify-center">
            <Logo />
          </div>

          {/* Success Icon */}
          <div className="flex justify-center mt-3">
            <div
              className="md:w-24 md:h-24 
            md:12 h:12 rounded-full bg-green-100 flex items-center justify-center shadow-sm"
            >
              <CircleCheckBig size={50} className="text-green-600" />
            </div>
          </div>

          {/* Heading */}
          <div className="text-center mt-6">
            <h1 className="lg:text-3xl text-xl font-bold text-gray-900">
              Payment Successful
            </h1>

            <p className="mt-3 text-gray-500 leading-relaxed">
              Thank you for your payment.
              <br />
              Your transaction has been completed successfully.
            </p>
          </div>

          {/* Transaction Card */}
          <div className="mt-8 rounded-2xl bg-white border border-gray-100 shadow-sm p-6 space-y-5 text-sm">
            <InfoRow
              icon={<Hash size={18} />}
              label="Reference"
              value={payment?.reference}
            />

            <InfoRow
              icon={<User size={18} />}
              label="Recipient"
              value={payment?.recipient}
            />

            <InfoRow
              icon={<Mail size={18} />}
              label="Email"
              value={payment?.email}
            />

            <InfoRow
              icon={<CalendarDays size={18} />}
              label="Date"
              value={formatDate(payment?.paid_at)}
            />

            <div className="border-t pt-5">
              <p className="uppercase tracking-wide text-xs text-gray-500">
                Amount Paid
              </p>

              <h2 className="text-2xl md:text-4xl font-bold text-primary mt-2">
                {amountFormatter(payment?.amount)}
              </h2>
            </div>
          </div>

          {/* Receipt */}
          <div className="mt-6 rounded-xl bg-green-50 border border-green-200 p-4">
            <div className="flex items-start gap-3">
              <Mail className="text-green-600 mt-0.5" size={20} />

              <div>
                <h3 className="font-semibold text-green-700">Receipt Sent</h3>

                <p className="text-sm text-green-600 mt-1">
                  A payment receipt has been sent to
                  <span className="font-medium"> {payment?.email}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-8 space-y-3">
            <Button
              leftIcon={<Download size={18} />}
              className="w-full"
              onClick={handleDownloadReceipt}
              isLoading={downloading}
            >
              Download Receipt
            </Button>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-400">
              Powered by{" "}
              <span className="font-semibold text-gray-700">UniPay</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const InfoRow = ({ icon, label, value }) => (
  <div className="flex items-center justify-between gap-4">
    <div className="flex items-center gap-3 text-gray-500">
      <div className="text-gray-400">{icon}</div>

      <span>{label}</span>
    </div>

    <span className="font-medium text-gray-900 text-right break-all">
      {value}
    </span>
  </div>
);

export default SuccessPage;
