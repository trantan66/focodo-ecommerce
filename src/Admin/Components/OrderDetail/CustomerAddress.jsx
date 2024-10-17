import React from 'react'

function CustomerAddress({ customerdata }) {
    return (
        <div className="bg-[#282941] pt-3 pb-4 rounded-sm text-white">
          <strong className="px-4 text-xl">Thông tin giao hàng</strong>
          {customerdata.map((items) => (
            <div className="flex flex-col gap-4 px-4 pt-3">
              <span>Địa chỉ 1: {items.customer.address1}</span>
              <span>Địa chỉ 2: {items.customer.address2}</span>
            </div>
          ))}
        </div>
      );
}

export default CustomerAddress