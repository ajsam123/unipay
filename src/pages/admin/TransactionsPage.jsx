import TransactionTable from "../../tables/TransactionTable";
import { transactionsPageRoute } from "../../router.jsx";

import { Link } from "@tanstack/react-router";
import { routes } from "../../constants/routes.js";
import chevron from "./../../assets/chevron-left.svg";
import { useGetTransactionsByLink } from "../../hooks/useTransactions.js";
import TransactionsPageSkeleton from "../../components/TransactionPagesSkeleton.jsx";

const TransactionsPage = () => {
  const { linkId } = transactionsPageRoute.useParams();
  console.log(linkId);

  const {
    data: transactions,
    isLoading,
    isError,
  } = useGetTransactionsByLink({ id: linkId });
  console.log(transactions);

  if (isLoading) {
    return <TransactionsPageSkeleton />;
  }

  if (isError) {
    return <TransactionErrorState />;
  }

  return (
    <section className="flex flex-col gap-4">
      <Link to={routes.PAYMENTPAGES}>
        <figure className="grid place-items-center border w-16 h-10 rounded-full">
          <img src={chevron} alt="Back" />
        </figure>
      </Link>

      <div className="flex flex-col gap-1">
        <div className="body-large-semibold my-2">
          Transaction List for Transactions
        </div>

        <p className="text-sm text-gray-500">
          Click a transaction to see more information and download the receipt.
        </p>
      </div>

      <TransactionTable transactions={transactions} linkId={linkId} />
    </section>
  );
};
export default TransactionsPage;
