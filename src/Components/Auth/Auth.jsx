import React from "react";
import { FaGooglePlusG } from "react-icons/fa";
import { Link } from "react-router-dom";

function Auth() {
  return (
    <div className="bg-gradient-to-r from-white to-[#C9D6FF]">
      <div className="flex items-center justify-center h-screen">
        <div className="flex w-[50rem] h-[30rem] bg-white rounded-[2rem] shadow-lg">
          <div className="flex flex-col flex-1 items-center justify-center gap-4 rounded-l-[2rem]">
            <strong className="text-3xl">Đăng nhập</strong>
            <button className="flex items-center justify-center border py-2 px-4 rounded-md">
              <FaGooglePlusG className="mr-2" />
              Đăng nhập bằng google
            </button>
            <span className="text-sm">
              Hoặc sử dụng tên đăng nhập và mật khẩu
            </span>
            <form action="" className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Tên đăng nhập"
                className="bg-gray-200 w-[20rem] px-4 py-2 rounded-lg focus:outline-none"
              />
              <input
                type="text"
                placeholder="Mật khẩu"
                className="bg-gray-200 w-[20rem] px-4 py-2 rounded-lg focus:outline-none"
              />
              <Link className="hover:cursor-pointer text-gray- text-center">
                Quên mật khẩu?
              </Link>

              <button
                className="bg-[#512DA8] text-white px-8 py-2 rounded-md"
                type="submit"
              >
                Đăng nhập
              </button>
            </form>
          </div>
          <div className="flex flex-col flex-1 text-white gap-4 items-center justify-center bg-gradient-to-l from-[#512DA8] to-[#564BB3] rounded-r-[2rem] rounded-l-[8rem] ">
            <strong className="text-3xl">Xin chào!</strong>
            <span className="text-center">
              Đăng ký thông tin cá nhân của bạn để sử dụng tất cả các tính năng
              của trang web
            </span>
            <button className="border border-white px-8 py-2 rounded-md ">
              Đăng kí
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;
