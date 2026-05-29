import Button from "../../components/Button";
import LinkTable from "../../tables/LinkTable";
import { useModalStore } from "../../store/modalStore";
import CreatePaymentLinkForm from "../../components/CreatePaymentLinkForm";

const PaymentPages = () => {
  const openModal = useModalStore((s) => s.openModal);

  return (
    <section className="flex flex-col gap-6">
      {/* ================= HEADER ================= */}
      <div className="flex w-full flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {/* TEXT SECTION */}
        <div className="flex flex-col gap-1">
          <h1 className="text-xl font-semibold text-gray-900">Payment Links</h1>

          <p className="text-sm text-gray-500 max-w-xl">
            Create and manage payment links to collect fees from students
            efficiently and track transactions in real time.
          </p>
        </div>

        {/* BUTTON */}
        <Button
          className="
            w-full md:w-auto 
            px-5 py-2.5 
            rounded-xl 
            shadow-sm 
            bg-black text-white 
            hover:bg-gray-800 
            transition
          "
          onClick={() => openModal(CreatePaymentLinkForm)}
        >
          + Create Payment Link
        </Button>
      </div>

      {/* ================= TABLE SECTION ================= */}
      <div className="flex flex-col gap-3">
        {/* SECTION TITLE */}
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-gray-800">
            All Payment Links
          </h2>

          <span className="text-xs text-gray-400">
            Manage, view & track collections
          </span>
        </div>

        {/* TABLE WRAPPER */}
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-2 md:p-4">
          <LinkTable />
        </div>
      </div>
    </section>
  );
};

export default PaymentPages;
