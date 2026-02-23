import TransactionTable from "../../tables/TransactionTable";
import { transactionsPageRoute } from "../../Router.jsx";
import { userLinks } from "../../data/links.js";
import { Link } from "@tanstack/react-router";
import { routes } from "../../constants/routes.js";
import chevron from "./../../assets/chevron-left.svg";

const TransactionsPage = () => {
  const { linkId } = transactionsPageRoute.useParams();
  // const { l }
  const transactionName =
    userLinks.find((x) => x.id === linkId)?.dueName || "Transactions";
  return (
    <section>
      <Link to={routes.PAYMENTPAGES}>
        {" "}
        <figure className="grid place-items-center border w-16 h-10 rounded-full">
          <img src={chevron} />
        </figure>
      </Link>
      <div className="body-large-semibold my-2">
        Transaction List for {transactionName}
      </div>
      <TransactionTable linkId={linkId} />
    </section>
  );
};

export default TransactionsPage;
