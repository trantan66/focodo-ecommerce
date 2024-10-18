import React, { useState } from "react";
import { UserData } from "./UserData";
import { Input, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import "./Style.css";
function UserIn4(props) {
  
  const currentUser = UserData[0]; // Lấy thông tin người dùng đầu tiên (có thể thay đổi)

  // State lưu trữ giới tính của người dùng hiện tại
  const [selectedGenders, setSelectedGenders] = useState([currentUser.gender]);

  // Hàm xử lý thay đổi checkbox
  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    if (event.target.checked) {
      setSelectedGenders([...selectedGenders, value]); // Thêm vào danh sách giới tính đã chọn
    } else {
      setSelectedGenders(selectedGenders.filter((gender) => gender !== value)); // Loại bỏ nếu bỏ chọn
    }
    
  };
  return (
    <div>
      <div className="mt-2"></div>
      <div className="flex justify-center">
        <div className="grid grid-cols-2 grid-rows-7 gap-4">
          <span>Tên đăng nhập</span>
          <Input value={props.username} ></Input>
          <span>Tên</span>
          <Input value={props.name}></Input>
          <span>Email</span>
          <Input value={props.email}></Input>
          <span>Số điện thoại</span>
          <Input value={props.phonenumber}></Input>
          <span>Giới tính</span>
          <div className="flex">
            <div className="flex mr-2">
              <input
                type="radio"
                className="size-4 mt-1 mr-1"
                name="gender"
                checked={selectedGenders.includes("male")} // Tự động tick nếu giới tính là "male"
                onChange={handleCheckboxChange}
              ></input>
              <label>Nam</label>
            </div>
            <div className="flex mr-2">
              <input
                type="radio"
                className="size-4 mt-1 mr-1"
                name="gender"
                checked={selectedGenders.includes("female")} // Tự động tick nếu giới tính là "female"
                onChange={handleCheckboxChange}
              ></input>
              <label>Nữ</label>
            </div>
            <div className="flex">
              <input
                type="radio"
                className="size-4 mt-1 mr-1"
                name="gender"
                checked={selectedGenders.includes("other")} // Tự động tick nếu giới tính là "female"
                onChange={handleCheckboxChange}
              ></input>
              <label>Khác</label>
            </div>
          </div>
          <span>Ngày sinh</span>
          <Input value={props.birth}></Input>
          <button className="bg-black text-white w-[200px] h-[48px] rounded-lg hover:bg-[#3C3D37] transition duration-300 ml-4">
            Lưu
          </button>
        </div>
        <div className=" flex mx-auto flex-col items-center ">
          <img
            src={props.img}
            alt=""
            className="h-auto w-[50%] rounded-full "
          />
          <Upload {...props} className="mt-5">
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </div>
      </div>
    </div>
  );
}

export default UserIn4;
