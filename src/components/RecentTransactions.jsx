import React from "react";
import TransactionTable from "../tables/TransactionTable";

const RecentTransactions = () => {
  return (
    <div>
      <span>Recent Transactions</span>
      <TransactionTable linkId="link1" />
    </div>
  );
};

export default RecentTransactions;
