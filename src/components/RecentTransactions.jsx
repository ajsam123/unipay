import React from "react";
import TransactionTable from "../tables/TransactionTable";

const RecentTransactions = () => {
  return (
    <div>
      <span className="heading-4 my-3">Recent Transactions</span>
      <TransactionTable linkId="link1" />
    </div>
  );
};

export default RecentTransactions;
