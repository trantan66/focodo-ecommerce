import { Product_Items } from "../Product/Product_Items";
import delivery from "../image/delivery.png";
import { InputNumber } from "antd";
function ProductDetail(props) {
  return (
    <div>
      <div className="flex justify-center">
        <div>
          <img
            src={props.image}
            alt=""
            className="max-w-[533px] max-h-[355.33px]"
          />
        </div>
        <div className="mx-3">
          <p className="text-[40px] font-semibold">{props.name}</p>
          <p className="opacity-50 italic text-[16px]">{props.subcription}</p>
          <p className="text-[32px] text-[#FF0000] font-semibold italic mt-2 mb-2">
            {props.price}đ
          </p>
          <InputNumber
            min={1}
            defaultValue={1}
            className="w-[200px]"
          ></InputNumber>
          <div className="flex mt-4 ">
            <button className=" bg-[#FAF7F0] text-black border border-black w-[200px] h-[48px] rounded-lg hover:bg-[#D8D2C2] transition duration-300 ">
              Thêm vào giỏ hàng
            </button>
            <button className="bg-black text-white w-[200px] h-[48px] rounded-lg hover:bg-[#3C3D37] transition duration-300 ml-4">
              Thanh toán
            </button>
          </div>
          <div className="flex opacity-50 mt-3">
            <img src={delivery} alt="" className="max-w-[40px] max-h-[40px] " />
            <div className="ml-3 ">
              <p className="font-semibold italic text-[13px]">
                Thời gian vận chuyển dự kiến
              </p>
              <p className="font-semibold italic text-[13px]">1 giờ - 3 ngày</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <p className="text-[24px] italic font-semibold">Mô tả </p>
        <p className="mt-3">{props.description}</p>
      </div>
    </div>
  );
}

function ProductMainDetail() {
  const productdisplay = Product_Items[0];
  return (
    <div>
      <ProductDetail
        name={productdisplay.name}
        subcription={productdisplay.subcription}
        price={productdisplay.price}
        image={productdisplay.image}
        description={productdisplay.description}
      ></ProductDetail>
    </div>
  );
}
export default ProductMainDetail;
