import React, { useState } from 'react';
import { UserData } from './UserData';
import { Input, Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import './Style.css';
function UserIn4(props) {
    const user = UserData[0]; // Lấy thông tin người dùng đầu tiên (có thể thay đổi)

    // State lưu trữ giới tính của người dùng hiện tại
    const [selectedGenders, setSelectedGenders] = useState([user.gender]);
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [number, setNumber] = useState(user.phoneNumber);
    const [birth, setBirth] = useState(user.birth);
    const [image, setImage] = useState(user.avatar);
    const handleInputNameChange = (event) => {
        setName(event.target.value);
    };
    const handleInputEmailChange = (event) => {
        setEmail(event.target.value);
    };
    const handleInputNumberChange = (event) => {
        setNumber(event.target.value);
    };
    const handleInputBirthChange = (event) => {
        setBirth(event.target.value);
    };
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
    const handleSave = () => {
        user.name = name;
        user.birth = birth;
        user.email = email;
        user.phoneNumber = number;
        user.avatar = image;
        console.log(user);
        alert('Update Complete!'); // Thông báo sau khi lưu
    };
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
        <div className="border p-3 bg-slate-100 rounded-lg">
            <div></div>
            <div className="flex justify-center">
                <div className="grid grid-cols-2 grid-rows-7 gap-4">
                    <span>Tên đăng nhập</span>
                    <Input value={props.username} disabled></Input>
                    <span>Tên</span>
                    <Input value={name} onChange={handleInputNameChange}></Input>
                    <span>Email</span>
                    <Input value={email} onChange={handleInputEmailChange}></Input>
                    <span>Số điện thoại</span>
                    <Input value={number} onChange={handleInputNumberChange}></Input>
                    <span>Giới tính</span>
                    <div className="flex">
                        <div className="flex mr-2">
                            <input
                                type="radio"
                                className="size-4 mt-1 mr-1"
                                name="gender"
                                checked={selectedGenders.includes('male')} // Tự động tick nếu giới tính là "male"
                                onChange={handleCheckboxChange}
                            ></input>
                            <label>Nam</label>
                        </div>
                        <div className="flex mr-2">
                            <input
                                type="radio"
                                className="size-4 mt-1 mr-1"
                                name="gender"
                                checked={selectedGenders.includes('female')} // Tự động tick nếu giới tính là "female"
                                onChange={handleCheckboxChange}
                            ></input>
                            <label>Nữ</label>
                        </div>
                        <div className="flex">
                            <input
                                type="radio"
                                className="size-4 mt-1 mr-1"
                                name="gender"
                                checked={selectedGenders.includes('other')} // Tự động tick nếu giới tính là "female"
                                onChange={handleCheckboxChange}
                            ></input>
                            <label>Khác</label>
                        </div>
                    </div>
                    <span>Ngày sinh</span>
                    <Input value={birth} onChange={handleInputBirthChange}></Input>
                    <button
                        onClick={handleSave}
                        className="bg-black text-white w-[200px] h-[48px] rounded-lg hover:bg-[#3C3D37] transition duration-300 ml-4"
                    >
                        Lưu
                    </button>
                </div>
                <div className=" flex mx-auto flex-col items-center ">
                    <img src={image} alt="" className=" h-[200px] w-[200px] rounded-full " />
                    <input className="mt-2" type="file" accept="image/*" onChange={handleImageChange}></input>
                </div>
            </div>
        </div>
    );
}

export default UserIn4;
