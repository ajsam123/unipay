import TransactionTable from "../../tables/TransactionTable";
import { transactionsPageRoute } from "../../router.jsx";

import { Link } from "@tanstack/react-router";
import { routes } from "../../constants/routes.js";
import chevron from "./../../assets/chevron-left.svg";

const TransactionsPage = () => {
  const { linkId } = transactionsPageRoute.useParams();

  const transactionName = "Transactions";
  return (
    <section className="flex flex-col gap-4">
      <Link to={routes.PAYMENTPAGES}>
        {" "}
        <figure className="grid place-items-center border w-16 h-10 rounded-full">
          <img src={chevron} />
        </figure>
      </Link>
      <div className="flex flex-col gap-1">
        <div className="body-large-semibold my-2">
          Transaction List for {transactionName}
        </div>
        <p className="text-sm text-gray-500">
          Click a transaction to see more information and download the receipt.
        </p>
      </div>

      <TransactionTable linkId={linkId} />
    </section>
  );
};

export default TransactionsPage;
