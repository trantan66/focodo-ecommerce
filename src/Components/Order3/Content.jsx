import { Product_Items } from "../Product/Product_Items";
import { Tabs, Input, Checkbox } from "antd";
import creditcard from "../image/Credit Card.png";
import QR from "../image/QR.jpg";
import Napas from "../image/Napas.jpg";
const onChange = (key) => {
  console.log(key);
};
const items = [
  {
    key: "1",
    label: "Visa",
    children: (
      <div className="">
        <img src={creditcard} alt="" className="" />
        <Input className="h-[48px] mt-3 " placeholder="Tên chủ sở hữu" />
        <Input className="h-[48px] mt-3" placeholder="Số thẻ" />
        <div className="flex mt-3">
          <Input
            className="w-[225px] h-[48px] mr-3"
            placeholder="Ngày hết hạn"
          ></Input>
          <Input className="w-[225px] h-[48px] ml-3" placeholder="CVV"></Input>
        </div>
      </div>
    ),
  },
  {
    key: "2",
    label: "VN Pay",
    children: (
      <div className="">
        <span className="ml-[10rem] font-semibold">
          Quét mã QR để thanh toán
        </span>
        <img src={QR} alt="" className="h-[350px] w-[350px] mx-auto my-3" />
      </div>
    ),
  },
  {
    key: "3",
    label: "Thẻ nội địa",
    children: (
      <div className="">
        <img src={Napas} alt="" className="w-[320px] h-[200px]" />
        <Input className="h-[48px] mt-3 " placeholder="Tên chủ sở hữu" />
        <Input className="h-[48px] mt-3" placeholder="Số thẻ" />
        <div className="flex mt-3">
          <Input className="w-[225px] h-[48px] mr-3" placeholder="Ngày"></Input>
          <Input
            className="w-[225px] h-[48px] ml-3"
            placeholder="Tháng/năm"
          ></Input>
        </div>
      </div>
    ),
  },
];
function Item(props) {
  return (
    <div className="flex border rounded-lg w-[464px] h-[72px] items-center bg-[#F6F6F6] my-2">
      <img
        src={props.img}
        alt=""
        className="w-[40px] h-[40px] ml-[1rem] rounded-lg"
      />
      <span className="ml-[1rem] italic">{props.name}</span>
      <span className="ml-auto mr-3 italic">{props.price}</span>
    </div>
  );
}

function Content() {
  const item1 = Product_Items[1];
  const item2 = Product_Items[2];
  const item3 = Product_Items[3];
  const total =
    parseInt(item1.price, 10) +
    parseInt(item2.price, 10) +
    parseInt(item3.price, 10);
  return (
    <div className="flex justify-center my-[3rem] ">
      <div className=" w-[512px] h-[728px] border rounded-xl mr-3">
        <p className="text-[20px] font-semibold italic p-3 my-2">Chi tiết</p>
        <div className="mx-4">
          <Item img={item1.image} name={item1.name} price={item1.price}></Item>
          <Item img={item2.image} name={item2.name} price={item2.price}></Item>
          <Item img={item3.image} name={item3.name} price={item3.price}></Item>
        </div>
        <div className="">
          <p className="text-[14px] italic opacity-75 p-3 my-2">Địa chỉ</p>
          <p className="mx-3 font-semibold">
            54 Nguyễn Lương Bằng, Phường Hóa Khánh Bắc, Quận Liên Chiểu, Đà Nẵng
          </p>
        </div>
        <div className="">
          <p className="text-[14px] italic opacity-75 p-3 my-2">
            Phương thức vận chuyển
          </p>
          <p className="mx-3 font-semibold">Miễn phí</p>
        </div>
        <div className="grid grid-cols-2 grid-rows-4 gap-2 p-3 my-2">
          <span className="font-semibold italic">Tổng cộng</span>
          <span className="font-semibold italic">{total}</span>
          <span className="">Giảm giá</span>
          <span className="font-semibold italic">0</span>
          <span className="">Phí vận chuyển</span>
          <span className="font-semibold italic">0</span>
          <span className="font-semibold italic">Thành tiền</span>
          <span className="font-semibold italic">{total}</span>
        </div>
      </div>
      <div className="w-[512px] h-[728px] border rounded-xl ml-3">
        <p className="text-[20px] italic font-semibold p-3">Thanh toán</p>
        <div className="h-[450px]">
          <Tabs
            defaultActiveKey="1"
            items={items}
            onChange={onChange}
            className="italic mx-3"
          />
        </div>
        <Checkbox className="p-3 mt-3">Trùng địa chỉ trong hóa đơn</Checkbox>
        <div className="flex mt-[3rem] justify-center">
          <button className=" bg-[#FAF7F0] text-black border border-black w-[200px] h-[48px] rounded-lg hover:bg-[#D8D2C2] transition duration-300 ">
            Quay lại
          </button>
          <button className="bg-black text-white w-[200px] h-[48px] rounded-lg hover:bg-[#3C3D37] transition duration-300 ml-4">
            Thanh toán
          </button>
        </div>
      </div>
    </div>
  );
}
export default Content;
