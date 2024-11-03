import React, { useEffect, useState } from 'react';
import { FiLoader } from 'react-icons/fi';
import axios from 'axios';
import { updateProfileToAPI } from '../../../Services/UserService';
import { notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import { FaAddressCard, FaChessKing, FaCity, FaUserAstronaut, FaUserCog } from 'react-icons/fa';
import { IoMdMailUnread } from 'react-icons/io';
import { MdOutlinePhoneInTalk } from 'react-icons/md';
import { RiCommunityFill } from 'react-icons/ri';
import { GiModernCity } from 'react-icons/gi';

function ProfileUpdate({ data }) {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');

    const [provinces, setProvinces] = useState([]); // State để lưu danh sách tỉnh/thành phố
    const [selectedProvince, setSelectedProvince] = useState(''); // Theo dõi tỉnh/thành phố được chọn
    const [districts, setDistricts] = useState([]); // State để lưu danh sách quận/huyện
    const [selectedDistrict, setSelectedDistrict] = useState(''); // Theo dõi quận/huyện được chọn
    const [communes, setCommunes] = useState([]); // State để lưu danh sách xã/phường
    const [selectedCommune, setSelectedCommune] = useState(''); // Theo dõi xã/phường được chọn

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

        const selectedProvinceName = provinces.find((p) => p.code === selectedProvince)?.name || data.province;
        const selectedDistrictName = districts.find((d) => d.code === selectedDistrict)?.name || data.district;
        const selectedCommuneName = communes.find((c) => c.code === selectedCommune)?.name || data.ward;

        const UserProfileRequest = {
            full_name: name,
            email: email,
            phone: phone,
            address: address,
            province: selectedProvinceName,
            district: selectedDistrictName,
            ward: selectedCommuneName,
        };
        console.log(UserProfileRequest);
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

    // Fetch province data on component mount
    useEffect(() => {
        axios
            .get('https://api.mysupership.vn/v1/partner/areas/province')
            .then((response) => {
                setProvinces(response.data.results);
            })
            .catch((error) => console.error('Error fetching provinces:', error));
    }, []);

    // Fetch district data when a province is selected
    useEffect(() => {
        if (selectedProvince) {
            axios
                .get(`https://api.mysupership.vn/v1/partner/areas/district?province=${selectedProvince}`)
                .then((response) => {
                    setDistricts(response.data.results);
                })
                .catch((error) => console.error('Error fetching districts:', error));
        }
    }, [selectedProvince]);

    // Fetch commune data when a district is selected
    useEffect(() => {
        if (selectedDistrict) {
            axios
                .get(`https://api.mysupership.vn/v1/partner/areas/commune?district=${selectedDistrict}`)
                .then((response) => {
                    setCommunes(response.data.results);
                })
                .catch((error) => console.error('Error fetching communes:', error));
        }
    }, [selectedDistrict]);
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

    return (
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
                        <span>
                            {selectedCommune !== data.ward
                                ? communes.find((c) => c.code === selectedCommune)?.name
                                : data.ward}
                        </span>
                    </div>
                    <div className="flex flex-row gap-2 pl-12 items-center">
                        <FaCity />
                        <span>
                            {selectedDistrict !== data.district
                                ? districts.find((d) => d.code === selectedDistrict)?.name
                                : data.district}
                        </span>
                    </div>
                    <div className="flex flex-row gap-2 pl-12 items-center">
                        <GiModernCity />
                        <span>
                            {selectedProvince !== data.province
                                ? provinces.find((p) => p.code === selectedProvince)?.name
                                : data.province}
                        </span>
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

                                <span className="text-white self-start pt-1">Tỉnh / Thành phố</span>
                                <select
                                    value={selectedProvince}
                                    onChange={handleProvinceChange}
                                    className="block w-full p-[8px] border rounded-md bg-[#282941] px-4"
                                >
                                    <option disabled>{data.province || 'Chọn Tỉnh/Thành Phố'}</option>
                                    {provinces
                                        .filter((province) => province.name !== data.province)
                                        .map((province) => (
                                            <option key={province.code} value={province.code}>
                                                {province.name}
                                            </option>
                                        ))}
                                </select>

                                <span className="text-white self-start pt-1">Quận / Huyện</span>
                                <select
                                    value={selectedDistrict}
                                    onChange={handleDistrictChange}
                                    disabled={!selectedProvince}
                                    className="block w-full p-[8px] border rounded-md bg-[#282941] px-4"
                                >
                                    <option disabled = {data.district && selectedDistrict ? true : false}>
                                        {data.district && selectedDistrict ? data.district : 'Chọn Quận/Huyện'}
                                    </option>
                                    {districts
                                        .filter((district) => district.name !== data.district)
                                        .map((district) => (
                                            <option key={district.code} value={district.code}>
                                                {district.name}
                                            </option>
                                        ))}
                                </select>

                                <span className="text-white self-start pt-1">Phường / Xã</span>
                                <select
                                    value={selectedCommune}
                                    onChange={handleCommuneChange}
                                    disabled={!selectedDistrict}
                                    className="block w-full p-[8px] border rounded-md bg-[#282941] px-4"
                                >
                                    <option disabled = {data.ward && selectedCommune ? true : false}>
                                        {data.ward && selectedCommune ? data.ward : 'Chọn Xã/Phường'}
                                    </option>
                                    {communes
                                        .filter((commune) => commune.name !== data.ward)
                                        .map((commune) => (
                                            <option key={commune.code} value={commune.code}>
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
    );
}

export default ProfileUpdate;
