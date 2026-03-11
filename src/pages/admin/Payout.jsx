import { Wallet } from "lucide-react";
import StatCard from "../../components/StatCard";

const Payout = () => {
  return (
    <section className="flex flex-col gap-4 w-full">
      <h1 className="heading-3">Payouts</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Previous Payout"
          value="$500"
          icon={Wallet}
          footer="April 6, 2025"
        />
        <StatCard
          title="Pending Payout"
          value="$1000"
          icon={Wallet}
          footer="April 6, 2025"
        />
      </div>
    </section>
  );
};

export default Payout;
