import React from "react";
import OrderDetailTableHeader from "../Components/OrderDetail/OrderDetailTableHeader";
import OrderDetailTable from "../Components/OrderDetail/OrderDetailTable";
import CustomerDetail from "../Components/OrderDetail/CustomerDetail";
import ShippingActivity from "../Components/OrderDetail/ShippingActivity";
import CustomerAddress from "../Components/OrderDetail/CustomerAddress";

const data = [];

function generateRandomOrder(index) {
  const customerNames = [
    "Charles Kelley",
    "Laura Montoya",
    "Deanna Meyer",
    "Elaine Walls",
    "Jason Gentry",
    "Lisa Peterson",
  ];

  const emails = [
    "mark45@yahoo.com",
    "gentryjason@hotmail.com",
    "jacksonsarah@yahoo.com",
    "petersonlisa@carter.com",
    "montoya22@gmail.com",
    "charles.kelley@abc.com",
  ];

  const statuses = [
    "ĐÃ ĐẶT",
    "ĐÃ XÁC NHẬN",
    "ĐANG GIAO HÀNG",
    "ĐÃ GIAO HÀNG",
    "ĐÃ HỦY",
  ];
  const payments = ["ĐÃ THANH TOÁN", "CHƯA THANH TOÁN", "ĐÃ HỦY"];

  const randomCustomerName =
    customerNames[Math.floor(Math.random() * customerNames.length)];
  const randomEmail = emails[Math.floor(Math.random() * emails.length)];
  const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
  const randomPayment = payments[Math.floor(Math.random() * payments.length)];

  const orderDatetime = new Date(
    Date.now() - Math.floor(Math.random() * 10000000000)
  )
    .toISOString()
    .slice(0, 19)
    .replace("T", " ");

  return {
    orderid: (5748 + index).toString(),
    order_datetime: orderDatetime,
    customer: {
      customerId: 68412,
      ordered: 12,
      name: randomCustomerName,
      email: randomEmail,
      phonenumber: "012-393-4122",
      address1: "54 Nguyễn Lương Bằng",
      address2: "144 Nguyễn Lương Bằng",
      bank: "5601730377333",
      image_link:
        "https://cdn.tuoitre.vn/471584752817336320/2024/6/3/doraemon-3-17173722166781704981911.jpeg",
    },
    payment: randomPayment,
    status: randomStatus,
    subtotal: 500000,
    discount: 3,
    finaltotal: 500000 * 0.7,
    ship: 15000,
  };
}

data.push(generateRandomOrder(1));

const productdata = [
  {
    id: "13123",
    name: "Plush Toy",
    price: 10000,
    quantity: 1,
    image_link:
      "https://cdn.tuoitre.vn/471584752817336320/2024/6/3/doraemon-3-17173722166781704981911.jpeg",
    description: `A unique Plush Toy featuring Doraemon.`,
  },
  {
    id: "13023",
    name: "Plush Toy",
    price: 10000,
    quantity: 4,
    image_link:
      "https://cdn.tuoitre.vn/471584752817336320/2024/6/3/doraemon-3-17173722166781704981911.jpeg",
    description: `A unique Plush Toy featuring Doraemon.`,
  },
  {
    id: "16523",
    name: "Plush Toy",
    price: 20000,
    quantity: 2,
    image_link:
      "https://cdn.tuoitre.vn/471584752817336320/2024/6/3/doraemon-3-17173722166781704981911.jpeg",
    description: `A unique Plush Toy featuring Doraemon.`,
  },
  {
    id: "12143",
    name: "Plush Toy",
    price: 30000,
    quantity: 1,
    image_link:
      "https://cdn.tuoitre.vn/471584752817336320/2024/6/3/doraemon-3-17173722166781704981911.jpeg",
    description: `A unique Plush Toy featuring Doraemon.`,
  },
];

function OrderDetail() {
  return (
    <div className="px-4 flex flex-col flex-1">
      <OrderDetailTableHeader data={data} />
      <div className="pt-3 pb-4 rounded-sm flex flex-row">
        <OrderDetailTable productdata={productdata} data={data} />
        <div className="flex flex-col flex-[1]">
          <CustomerDetail customerdata={data}/>
          <CustomerAddress customerdata={data}/>
        </div>
      </div>
      <ShippingActivity/>
    </div>
  );
}

export default OrderDetail;
