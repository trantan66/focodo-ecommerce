import React from "react";
import tonghopmon from "../image/tonghopmon2.jpg";
import delivery from "../image/delivery.jpg";
import payment from "../image/payment.jpg";

function PrePage() {
  return (
    <div className="justify-center items-centers">
      <h2 className="text-center text-[42px] font-bold  ">VỀ CỬA HÀNG</h2>
      <p className="max-w-[700px] mt-2 mb-5 text-[18px] text-center mx-auto  ">
        FoCoDo là hệ thống chuyên cung cấp các sản phẩm đặc sản đến từ Cố Đô
        Huế. Với phương châm "Gói trọn ẩm thực Huế", chúng tôi luôn mang đến cho
        khách hàng những món ăn theo tiêu chuẩn truyền thống cung đình Huế với
        giá thành hợp lí nhất. Hệ thống chúng tôi cung cấp:
      </p>
      {/* <p className="text-center text-[30px] font-bold font-serif">
        "Ngon như mẹ bạn"
      </p> */}
      <div className="flex justify-center">
        <div className="flex w-1/5 border mr-4 rounded-[10%] bg-[#B7B7B7] shadow-xl shadow-[#3B3030] hover:bg-[#664343] duration-500 ">
          <div className="mt-4 mx-2 group">
            <span className=" text-[22px] text-[#3B3030]  font-bold p-2.5 group-hover:text-white duration-500">
              Đa Dạng Sản Phẩm
            </span>
            <div class="w-full h-0.5 bg-[#3B3030] mt-2 mb-4 group-hover:bg-white duration-500"></div>
            <p className=" text-[#3B3030] text-[18px] text-center group-hover:text-white duration-500">
              FoCoDo cung cấp nhiều loại đặc sản đến từ Huế, giúp lựa chọn của
              bạn đa dạng hơn
            </p>
          </div>
        </div>
        <div className="w-2/5">
          <img
            src={tonghopmon}
            alt=""
            className="border rounded-[10%] shadow-xl shadow-[#3B3030]"
          />
        </div>
      </div>
      <div className="flex justify-center mt-[100px]">
        <div className="flex w-1/5 border mr-4 rounded-[10%] bg-[#758694] shadow-xl shadow-[#3B3030] hover:bg-[#D8D2C2] hover:text-[#3B3030] duration-500 ">
          <div className="mt-4 mx-2 group">
            <p className=" text-[25px] text-[#FFFFFF]  font-bold mx-4 pl-3 group-hover:text-[#222831] duration-500">
              Vận Chuyển Toàn Quốc
            </p>
            <div class="w-full h-0.5 bg-[#FFFFFF] mt-2 mb-4 group-hover:bg-[#222831] duration-500"></div>
            <p className=" text-[#FFFFFF] text-[18px] text-center group-hover:text-[#222831] duration-500">
              Hệ thống vận chuyển trải dài khắp cả nước cùng với các hình thức
              giao hàng khác nhau
            </p>
          </div>
        </div>
        <div className="w-2/5">
          <img
            src={delivery}
            alt=""
            className="border rounded-[10%] shadow-xl shadow-[#3B3030]"
          />
        </div>
      </div>

      <div className="flex justify-center mt-[100px]">
        <div className="flex w-1/5 border mr-4 rounded-[10%] bg-[#222831] shadow-xl shadow-[#3B3030] hover:bg-[#FECDA6] hover:text-[#3B3030] duration-500 ">
          <div className="mt-4 mx-2 group">
            <p className=" text-[25px] text-[#FFFFFF] text-center  font-bold mx-4 group-hover:text-[#222831] duration-500">
              Thanh Toán Đa Dạng
            </p>
            <div class="w-full h-0.5 bg-[#FFFFFF] mt-2 mb-4 group-hover:bg-[#222831] duration-500"></div>
            <p className=" text-[#FFFFFF] text-[18px] text-center group-hover:text-[#222831] duration-500">
              Khách hàng có thể thanh toán bằng nhiều hình thức khác nhau
            </p>
          </div>
        </div>
        <div className="w-2/5">
          <img
            src={payment}
            alt=""
            className="border rounded-[10%] shadow-xl shadow-[#3B3030]"
          />
        </div>
      </div>
    </div>
  );
}
export default PrePage;
