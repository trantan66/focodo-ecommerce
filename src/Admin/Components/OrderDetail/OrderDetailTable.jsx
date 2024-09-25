import React from "react";
import { Link } from "react-router-dom";

function OrderDetailTable({ productdata, data }) {
  const totalPrice = productdata.reduce((total, product) => {
    return total + product.price * product.quantity;
  }, 0);
  return (
    <div className="bg-[#282941] pt-3 p-4 mr-4 rounded-sm flex-[2] text-white">
      <strong className="text-white font-medium">Chi tiết đơn hàng</strong>
      <div className="mt-3">
        <table className="w-full text-white border-x-gray-400">
          <thead>
            <tr className="bg-[#2E3044] h-10">
              <td className="pl-2">Sản phẩm</td>
              <td>Giá</td>
              <td>Số lượng</td>
              <td>Tổng</td>
            </tr>
          </thead>
          <tbody className="h-[50vh]">
            {productdata.map((items, index) => (
              <tr key={index} className="border-b-2">
                <td>
                  <div className="bg-[#282941] rounded-sm flex-1 flex items-center">
                    <img
                      src={items.image_link}
                      alt="Product"
                      className="w-10 h-10 rounded-sm object-cover"
                    />
                    <div className="pl-2">
                      <Link
                        to={`productdetail/${items.id}`}
                        className="text text-sm font-semibold text-[#787BFF]"
                      >
                        {items.name}
                      </Link>
                      <div className="flex items-center">
                        <strong className="text-xs text-white font-light">
                          {items.description}
                        </strong>
                      </div>
                    </div>
                  </div>
                </td>
                <td>đ{items.price}</td>
                <td>{items.quantity}</td>
                <td>đ{items.price * items.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col items-end pt-3">
        <div className="grid grid-cols-2 gap-3">
          <span>Tổng tiền:</span>
          <span className="text-left">đ{totalPrice}</span>

          <span>Discount:</span>
          {data.map((items) => (
            <span className="text-left">{items.discount}%</span>
          ))}

          <span>Ship:</span>
          {data.map((items) => (
            <span className="text-left">đ{items.ship}</span>
          ))}

          <span>Thành tiền:</span>
          {data.map((items) => (
            <span className="text-left">
              đ{totalPrice - (totalPrice * items.discount) / 100 + items.ship}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default OrderDetailTable;
