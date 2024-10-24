import React from "react";
import OrderList from "../Components/Order/OrderList";
import PaymentChart from "../Components/Order/PaymentChart";

function Order() {

  return (
    <div className="flex flex-col gap-4">
      <PaymentChart />
      <OrderList />
    </div>
  );
}

export default Order;
