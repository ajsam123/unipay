import Button from "../../components/Button";

const PaymentPages = () => {
  return (
    <>
      <div className="flex w-full justify-between">
        <div className="flex flex-col gap-3">
          <span className="body-medium-medium">Create new Link</span>
          <span className="body-small-semibold">
            Generate payment links to collect fees from students
          </span>
        </div>
        <Button>Create payment Link</Button>
      </div>
      <div>
        <div>All Payment Links</div>
      </div>
    </>
  );
};

export default PaymentPages;
