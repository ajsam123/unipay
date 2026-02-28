import Button from "../../components/Button";
import LinkTable from "../../tables/LinkTable";
import { useModalStore } from "../../store/modalStore";
import CreatePaymentLinkForm from "../../components/CreatePaymentLinkForm";

const PaymentPages = () => {
  const { openModal } = useModalStore((s) => s);
  return (
    <section className="flex flex-col gap-4">
      <div className="flex w-full md:justify-between flex-col gap-4 md:flex-row">
        <div className="flex flex-col gap-3">
          <span className="body-medium-medium">Create new Link</span>
          <span className="body-small-semibold">
            Generate payment links to collect fees from students
          </span>
        </div>
        <Button
          className="w-full max-w-45"
          onClick={() =>
            openModal({
              title: "Create Payment Link",
              content: <CreatePaymentLinkForm />,
            })
          }
        >
          Create payment Link
        </Button>
      </div>
      <div className="flex flex-col gap-3">
        <div>All Payment Links</div>
        <LinkTable />
      </div>
    </section>
  );
};

export default PaymentPages;
