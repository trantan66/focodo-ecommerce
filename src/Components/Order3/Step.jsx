import { Steps } from "antd";
import {
  TruckOutlined,
  EnvironmentOutlined,
  CreditCardOutlined,
} from "@ant-design/icons";
function Step() {
  return (
    <div className="w-[1000px] mx-auto my-[5rem]">
      <Steps
        className="italic"
        items={[
          {
            title: "Address",
            icon: <EnvironmentOutlined></EnvironmentOutlined>,
            status: "wait",
          },
          {
            title: "Shipping",
            icon: <TruckOutlined></TruckOutlined>,
            status: "wait",
          },
          {
            title: "Payment",
            icon: <CreditCardOutlined></CreditCardOutlined>,
            status: "process",
          },
        ]}
      ></Steps>
    </div>
  );
}
export default Step;
