import React from "react";
import DashboardStatsGrid from "../Components/Dashboard/DashboardStatsGrid";
import TransactionChart from "../Components/Dashboard/TransactionChart";
import BuyProfileChart from "../Components/Dashboard/BuyProfileChart";
import RecentOrder from "../Components/Dashboard/RecentOrder";
import PopularProduct from "../Components/Dashboard/PopularProduct";

function Dashboard() {
  return (
    <div className="flex gap-4 p-4 flex-col">
      <DashboardStatsGrid />
      <div className="flex flex-row gap-4 w-full">
        <TransactionChart />
        <BuyProfileChart />
      </div>
      <div className="flex flex-row gap-4 w-full">
        <RecentOrder />
        <PopularProduct />
      </div>
    </div>
  );
}

export default Dashboard;
