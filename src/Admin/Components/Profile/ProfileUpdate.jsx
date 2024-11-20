import React, { useEffect, useRef, useState } from 'react';
import { FiLoader } from 'react-icons/fi';
import axios from 'axios';
import { updateAvatarToAPI, updateProfileToAPI } from '../../../Services/UserService';
import { notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import { FaAddressCard, FaCalendarCheck, FaChessKing, FaCity, FaUserAstronaut, FaUserCog } from 'react-icons/fa';
import { IoMdMailUnread } from 'react-icons/io';
import { MdCancel, MdOutlinePhoneInTalk } from 'react-icons/md';
import { RiCommunityFill } from 'react-icons/ri';
import { GiModernCity } from 'react-icons/gi';
import { GoCheckCircleFill } from 'react-icons/go';

function ProfileUpdate({ data }) {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');

    const [provinces, setProvinces] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState('');

    const [districts, setDistricts] = useState([]);
    const [selectedDistrict, setSelectedDistrict] = useState('');

    const [communes, setCommunes] = useState([]);
    const [selectedCommune, setSelectedCommune] = useState('');

    const [loadingIcon, setLoadingIcon] = useState(false);
    const [loadingScreen, setLoadingScreen] = useState(false);

    useEffect(() => {
        if (data) {
            setName(data.full_name || '');
            setEmail(data.email || '');
            setPhone(data.phone || '');
            setAddress(data.address || '');
            setSelectedProvince(data.province || '');
            setSelectedDistrict(data.district || '');
            setSelectedCommune(data.ward || '');
        }
    }, [data]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoadingIcon(true);
        setLoadingScreen(true);

        const UserProfileRequest = {
            full_name: name,
            email: email,
            phone: phone,
            address: address,
            province: selectedProvince,
            district: selectedDistrict,
            ward: selectedCommune,
        };
        try {
            await updateProfileToAPI(UserProfileRequest);
        } catch (error) {
            console.error('Error updating admin profile:', error);
            notification.error({
                message: 'Có lỗi xảy ra!',
                description: 'Không thể cập nhật hồ sơ. Vui lòng thử lại.',
            });
        } finally {
            notification.success({
                message: 'Cập nhật hồ sơ thành công!',
                description: 'Hồ sơ đã được cập nhật.',
                duration: '1',
            });
            setLoadingIcon(false);
            setLoadingScreen(false);
            navigate('/admin/profile');
        }
    };

    useEffect(() => {
        axios
            .get('https://api.mysupership.vn/v1/partner/areas/province')
            .then((response) => {
                setProvinces(response.data.results);
            })
            .catch((error) => console.error('Error fetching provinces:', error));
    }, []);
    useEffect(() => {
        if (!provinces.length || !selectedProvince) return;

        const selected = provinces.find((province) => province.name === selectedProvince);

        if (!selected) return;

        axios
            .get(`https://api.mysupership.vn/v1/partner/areas/district?province=${selected.code}`)
            .then((response) => {
                setDistricts(response.data.results);
            })
            .catch((error) => console.error('Error fetching districts:', error));
    }, [selectedProvince, provinces]);

    useEffect(() => {
        if (!districts.length || !selectedDistrict) return;

        const selected = districts.find((district) => district.name === selectedDistrict);

        if (!selected) return;

        axios
            .get(`https://api.mysupership.vn/v1/partner/areas/commune?district=${selected.code}`)
            .then((response) => {
                setCommunes(response.data.results);
            })
            .catch((error) => console.error('Error fetching communes:', error));
    }, [selectedDistrict, districts]);

    const handleProvinceChange = (e) => {
        setSelectedProvince(e.target.value);
        setSelectedDistrict('');
    };

    const handleDistrictChange = (e) => {
        setSelectedDistrict(e.target.value);
        setSelectedCommune('');
    };

    const handleCommuneChange = (e) => {
        setSelectedCommune(e.target.value);
    };

    const [avatar, setAvatar] = useState(data.avatar);
    const [preview, setPreview] = useState(null);
    const fileInputRef = useRef(null);
    const handleAvatarClick = () => {
        fileInputRef.current.click();
    };
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setAvatar(file);
            const fileURL = URL.createObjectURL(file);
            setPreview(fileURL);
        }
    };
    const handleConfirm = async (e) => {
        e.stopPropagation();
        setLoadingScreen(true);
        try {
            await updateAvatarToAPI(avatar).then(() => {
                notification.success({
                    message: 'Cập nhập thành công!',
                    description: 'Thay đổi avatar thành công',
                    duration: 1,
                });
                setAvatar(preview);
                setPreview(null);
                setLoadingScreen(false);
            });
        } catch (error) {}
    };

    const handleCancel = (e) => {
        e.stopPropagation();
        setAvatar(data.avatar);
        setPreview(null);
    };

    return (
        <div className="flex flex-col">
            <div className="bg-[#282941] rounded-md mx-4 text-white relative">
                <div className="w-full">
                    <img
                        src="https://img.freepik.com/free-vector/leafy-dragonfly-frame-background_53876-113009.jpg?t=st=1730371534~exp=1730375134~hmac=52eeb19633bccd7f03a58f814782b8409a1fc54027c982bacf3fa66c24e33384&w=996"
                        alt=""
                        className="w-full h-[20rem] object-cover rounded-md"
                    />
                </div>

                <div
                    onClick={handleAvatarClick}
                    className="absolute bottom-6 left-[15%] transform -translate-x-1/2 w-32 h-32 bg-[#282941] rounded-md border-4 border-[#282941] flex items-center justify-center"
                >
                    <img src={preview || avatar} alt="" className="w-full h-full object-cover rounded-md" />
                    <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                    {preview && (
                        <div className="absolute bottom-[-4rem] left-1/2 transform -translate-x-1/2 mt-4 flex space-x-4">
                            <button
                                className="bg-green-500 text-white rounded-md px-6 py-2 whitespace-nowrap flex flex-row items-center gap-2"
                                onClick={handleConfirm}
                            >
                                <GoCheckCircleFill /> Xác nhận
                            </button>

                            <button
                                className="bg-red-500 text-white rounded-md px-6 py-2 whitespace-nowrap flex flex-row items-center gap-2"
                                onClick={handleCancel}
                            >
                                <MdCancel />
                                Hủy
                            </button>
                        </div>
                    )}
                </div>

                <div className="h-24 bg-[#282941]">
                    <div className="flex flex-col ml-72 mt-2">
                        <span className="text-3xl">{data.full_name}</span>
                        <div className="flex items-center mt-2">
                            <span>
                                <FaCalendarCheck />
                            </span>
                            <span className="ml-2">
                                Ngày tạo: {data.created_date ? data.created_date : 'Chưa có ngày tạo'}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-row mt-4 mb-4">
                <div className="bg-[#282941] mx-4 text-gray-400 w-4/12">
                    <div className="flex flex-col gap-4 mb-4">
                        <span className="text-gray-300 text-lg px-4 pt-4">Chi tiết</span>
                        <div className="flex flex-row gap-2 pl-12 items-center">
                            <FaUserCog />
                            <span>Họ tên: {name}</span>
                        </div>
                        <div className="flex flex-row gap-2 pl-12 items-center">
                            <FaChessKing />
                            <span>Vai trò: {data.role}</span>
                        </div>
                        <div className="flex flex-row gap-2 pl-12 items-center">
                            <FaUserAstronaut />
                            <span>Username: {data.username}</span>
                        </div>

                        <span className="text-gray-300 text-lg px-4 pt-4">Liên hệ</span>
                        <div className="flex flex-row gap-2 pl-12 items-center">
                            <IoMdMailUnread />
                            <span>Email: {email}</span>
                        </div>
                        <div className="flex flex-row gap-2 pl-12 items-center">
                            <MdOutlinePhoneInTalk />
                            <span>Số điện thoại: {phone}</span>
                        </div>
                        <div className="flex flex-row gap-2 pl-12 items-center">
                            <FaAddressCard />
                            <span>Địa chỉ: {address}</span>
                        </div>
                        <div className="flex flex-row gap-2 pl-12 items-center">
                            <RiCommunityFill />
                            <span>{selectedCommune}</span>
                        </div>
                        <div className="flex flex-row gap-2 pl-12 items-center">
                            <FaCity />
                            <span>{selectedDistrict}</span>
                        </div>
                        <div className="flex flex-row gap-2 pl-12 items-center">
                            <GiModernCity />
                            <span>{selectedProvince}</span>
                        </div>
                    </div>
                </div>

                <div className="relative flex-1">
                    {loadingScreen && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                            <FiLoader className="text-white text-6xl animate-spin" />
                        </div>
                    )}
                    <div className="bg-[#282941] mr-4 text-white ">
                        <div className="flex flex-col">
                            <span className="text-xl px-4 pt-4">Cập nhập thông tin</span>
                            <form onSubmit={handleSubmit}>
                                <div className="flex flex-row gap-4 w-full px-4 pt-4">
                                    <div className="flex items-center flex-col flex-[2]">
                                        <span className=" text-white mb-1 self-start">Họ tên</span>
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="text-sm focus:outline-none border border-gray-300 w-full h-10 px-4 rounded-sm bg-[#282941] text-white mr-2 "
                                            placeholder="Nhập họ và tên"
                                            required
                                        />
                                    </div>
                                    {/*  */}
                                    <div className="flex items-center flex-col flex-[1]">
                                        <span className=" text-white mb-1 self-start">Số điện thoại</span>
                                        <input
                                            type="text"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            className="text-sm focus:outline-none border border-gray-300 w-full h-10 px-4 pr-4 rounded-sm bg-[#282941] text-white "
                                            placeholder="Nhập số điện thoại"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col w-full px-4 pb-4">
                                    {/*  */}
                                    <div className="flex items-center flex-col">
                                        <span className=" text-white mb-1 self-start ">Email</span>
                                        <input
                                            type="text"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="text-sm focus:outline-none border border-gray-300 w-full h-10 px-4 rounded-sm bg-[#282941] text-white "
                                            placeholder="Nhập Email"
                                            required
                                        />
                                    </div>
                                    {/* Tỉnh */}
                                    <span className="text-white self-start pt-1">Tỉnh / Thành phố</span>
                                    <select
                                        value={selectedProvince}
                                        onChange={handleProvinceChange}
                                        className="block w-full p-[8px] border rounded-md bg-[#282941] px-4"
                                        required
                                    >
                                        <option>{data.province || 'Chọn Tỉnh/Thành Phố'}</option>
                                        {provinces.map((province) => (
                                            <option key={province.code} value={province.name}>
                                                {province.name}
                                            </option>
                                        ))}
                                    </select>
                                    {/* Xã */}
                                    <span className="text-white self-start pt-1">Quận / Huyện</span>
                                    <select
                                        value={selectedDistrict}
                                        onChange={handleDistrictChange}
                                        disabled={!selectedProvince}
                                        className="block w-full p-[8px] border rounded-md bg-[#282941] px-4"
                                        required
                                    >
                                        <option>{selectedDistrict || 'Chọn Quận/Huyện'}</option>
                                        {districts.map((district) => (
                                            <option key={district.code} value={district.name}>
                                                {district.name}
                                            </option>
                                        ))}
                                    </select>
                                    {/* Huyện */}
                                    <span className="text-white self-start pt-1">Phường / Xã</span>
                                    <select
                                        value={selectedCommune}
                                        onChange={handleCommuneChange}
                                        disabled={!selectedDistrict}
                                        className="block w-full p-[8px] border rounded-md bg-[#282941] px-4"
                                        required
                                    >
                                        <option>{selectedCommune || 'Chọn Xã/Phường'}</option>
                                        {communes.map((commune) => (
                                            <option key={commune.code} value={commune.name}>
                                                {commune.name}
                                            </option>
                                        ))}
                                    </select>

                                    <div className="flex items-center flex-col">
                                        <span className=" text-white mb-1 self-start pt-1">Địa chỉ</span>
                                        <input
                                            type="text"
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                            className="text-sm focus:outline-none border border-gray-300 w-full h-10 px-4 rounded-sm bg-[#282941] text-white "
                                            placeholder="Nhập địa chỉ"
                                            required
                                        />
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    className={`w-36 p-3 mb-4 mx-4 rounded-md text-white flex items-center justify-center
           ${loadingIcon ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-500'}`}
                                    disabled={loadingIcon ? true : ''}
                                >
                                    {loadingIcon ? <FiLoader className="animate-spin mr-2" /> : null}
                                    <span>Cập nhật</span>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileUpdate;
