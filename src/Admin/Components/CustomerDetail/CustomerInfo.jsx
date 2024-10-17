import React, { useState } from "react";
import { GiPayMoney } from "react-icons/gi";
import { IoCart } from "react-icons/io5";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

function CustomerInfo({ customerdata }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  function openDialog(customer) {
    setSelectedCustomer(customer);
    setIsOpen(true);
  }

  function closeDialog() {
    setIsOpen(false);
    setSelectedCustomer(null);
  }

  function handleSubmit() {
    // Xử lý gửi dữ liệu ở đây
    console.log("Data submitted:", selectedCustomer);
    closeDialog();
  }

  return (
    <div className="bg-[#282941] p-4 mr-4 rounded-sm text-white">
      {customerdata.map((items) => (
        <div key={items.id} className="flex flex-col ">
          <div className="flex flex-col items-center">
            <img
              src={items.image_link}
              alt="Customer"
              className="rounded-md mb-4"
            />
            <strong>{items.name}</strong>
            <span>ID khách hàng: #{items.id}</span>
          </div>

          <div className="flex mt-3 justify-between px-4 gap-4">
            <div className="rounded-sm flex-1 flex items-end">
              <div className="rounded-md w-12 h-12 bg-[#35365F] flex items-center justify-center">
                <IoCart className="text-2xl text-[#696CFF]" />
              </div>
              <div className="pl-3">
                <strong className="text text-xl text-white font-semibold">
                  {items.ordered}
                </strong>
                <div className="flex items-center">
                  <span className="text text-sm text-white font-light">
                    Hóa đơn
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-sm flex-1 flex items-end">
              <div className="rounded-md w-12 h-12 bg-[#35365F] flex items-center justify-center">
                <GiPayMoney className="text-2xl text-[#696CFF]" />
              </div>
              <div className="pl-3">
                <strong className="text text-xl text-white font-semibold">
                  đ{items.totalspent}
                </strong>
                <div className="flex items-center">
                  <span className="text text-sm text-white font-light">
                    Chi tiêu
                  </span>
                </div>
              </div>
            </div>
          </div>

          <strong className="text-xl mt-4 border-b-2">Chi tiết</strong>

          <div className="flex flex-col gap-4 mt-4">
            <span>Username: {items.username}</span>
            <span>Email: {items.email}</span>
            <div>
              <span>Trạng thái: </span>
              <span
                className={
                  items.status === "Hoạt động"
                    ? "capitalize py-1 px-2 rounded-md text-xs text-green-900 bg-green-300"
                    : ""
                }
              >
                {items.status}
              </span>
            </div>
            <span>Số điện thoại: {items.phone}</span>
          </div>

          <button
            className="bg-blue-600 mt-4 rounded-md p-2"
            onClick={() => openDialog(items)}
          >
            Cập nhật
          </button>
        </div>
      ))}

      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10"
        onClose={closeDialog}
      >
        <div className="fixed inset-0 bg-black/30" />
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel className="w-full max-w-md rounded-xl bg-[#282941] p-6 backdrop-blur-2xl">
              <DialogTitle
                as="h3"
                className="text-lg font-medium leading-6 text-white"
              >
                Cập nhật thông tin khách hàng
              </DialogTitle>
              {selectedCustomer && (
                <form className="mt-4 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-white">
                      Tên khách hàng
                    </label>
                    <input
                      type="text"
                      value={selectedCustomer.name}
                      onChange={(e) =>
                        setSelectedCustomer({
                          ...selectedCustomer,
                          name: e.target.value,
                        })
                      }
                      className="ext-sm focus:outline-none border border-gray-300 mt-1 p-2 w-full rounded-md bg-[#282941] text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white">
                      Email
                    </label>
                    <input
                      type="email"
                      value={selectedCustomer.email}
                      onChange={(e) =>
                        setSelectedCustomer({
                          ...selectedCustomer,
                          email: e.target.value,
                        })
                      }
                      className="ext-sm focus:outline-none border border-gray-300 mt-1 p-2 w-full rounded-md bg-[#282941] text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white">
                      Số điện thoại
                    </label>
                    <input
                      type="text"
                      value={selectedCustomer.phone}
                      onChange={(e) =>
                        setSelectedCustomer({
                          ...selectedCustomer,
                          phone: e.target.value,
                        })
                      }
                      className="ext-sm focus:outline-none border border-gray-300 mt-1 p-2 w-full rounded-md bg-[#282941] text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white">
                      Địa chỉ
                    </label>
                    <input
                      type="text"
                      value={selectedCustomer.address}
                      onChange={(e) =>
                        setSelectedCustomer({
                          ...selectedCustomer,
                          address: e.target.value,
                        })
                      }
                      className="ext-sm focus:outline-none border border-gray-300 mt-1 p-2 w-full rounded-md bg-[#282941] text-white"
                    />
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="bg-blue-600 text-white py-2 px-4 rounded-md"
                      onClick={handleSubmit}
                    >
                      Xác nhận
                    </button>
                    <button
                      type="button"
                      className="ml-2 bg-gray-600 text-white py-2 px-4 rounded-md"
                      onClick={closeDialog}
                    >
                      Hủy
                    </button>
                  </div>
                </form>
              )}
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export default CustomerInfo;
