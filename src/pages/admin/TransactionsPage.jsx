import { Route } from "@/routes/payment-pages/$linkId";
import TransactionTable from "../../tables/TransactionTable";
import { routes } from "../../constants/routes";

const TransactionsPage = () => {
  const { linkId } = Route.useParams();
  return (
    <div>
      <TransactionTable linkId={linkId} />
    </div>
  );
};

export default TransactionsPage;
