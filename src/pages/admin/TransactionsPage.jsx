import TransactionTable from "../../tables/TransactionTable";
import { transactionsPageRoute } from "../../Router.jsx";

const TransactionsPage = () => {
  const { linkId } = transactionsPageRoute.useParams();
  return (
    <div>
      <TransactionTable linkId={linkId} />
    </div>
  );
};

export default TransactionsPage;
