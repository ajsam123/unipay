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
} from "lucide-react";
import { Link, useSearch } from "@tanstack/react-router";
import { routes } from "../../constants/routes";
import { useVerifyPayment } from "../../hooks/usePaymentPage";

const SuccessPage = () => {
  const { reference } = useSearch({
    from: routes.PAYMENTSUCCESSPAGE,
  });

  const {
    mutate: verifyPaymentMutate,
    data,
    isPending,
    isError,
  } = useVerifyPayment();

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reference]);

  const payment = data;

  const amountFormatter = (amount) => {
    if (amount == null) return "";
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(amount);
  };

  return (
    <section className="min-h-screen bg-linear-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-lg">
        <div className="bg-white/60 backdrop-blur-xl border border-white/40 rounded-3xl shadow-xl p-8">
          {/* Logo */}
          <div className="flex justify-center">
            <Logo />
          </div>

          {/* Success Icon */}
          <div className="flex justify-center mt-8">
            <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center shadow-sm">
              <CircleCheckBig size={50} className="text-green-600" />
            </div>
          </div>

          {/* Heading */}
          <div className="text-center mt-6">
            <h1 className="text-3xl font-bold text-gray-900">
              Payment Successful
            </h1>

            <p className="mt-3 text-gray-500 leading-relaxed">
              Thank you for your payment.
              <br />
              Your transaction has been completed successfully.
            </p>
          </div>

          {/* Transaction Card */}
          <div className="mt-8 rounded-2xl bg-white border border-gray-100 shadow-sm p-6 space-y-5">
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

              <h2 className="text-4xl font-bold text-primary mt-2">
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
            <Button leftIcon={<Download size={18} />} className="w-full">
              Download Receipt
            </Button>

            <Link to={routes.HOMEPAGE} className="block">
              <Button
                variant="stroke"
                className="w-full"
                leftIcon={<ArrowLeft size={18} />}
              >
                Back to Homepage
              </Button>
            </Link>
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
