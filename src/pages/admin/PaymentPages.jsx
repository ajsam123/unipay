import TransactionTable from "../../tables/TransactionTable";
import Button from "../../components/Button";
import LinkTable from "../../tables/LinkTable";

const PaymentPages = () => {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex w-full justify-between">
        <div className="flex flex-col gap-3">
          <span className="body-medium-medium">Create new Link</span>
          <span className="body-small-semibold">
            Generate payment links to collect fees from students
          </span>
        </div>
        <Button>Create payment Link</Button>
      </div>
      <div className="flex flex-col gap-3">
        <div>All Payment Links</div>
        <LinkTable />
      </div>
    </section>
  );
};

export default PaymentPages;
