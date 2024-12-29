import React, { useEffect, useState } from 'react';
import { Input, Upload, Button, notification, Spin } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import default_avatar from '../image/avatar/default_avatar.png';
import './Style.css';
import axios from 'axios';
import { updateAvatarToAPI, updateProfileToAPI } from '../../Services/UserService';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';
function UserIn4({ data }) {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [avatar, setAvatar] = useState();
    const [address, setAddress] = useState('');
    const [loading, setLoading] = useState(false);
    const [provinces, setProvinces] = useState([]); // State để lưu danh sách tỉnh/thành phố
    const [selectedProvince, setSelectedProvince] = useState(''); // Theo dõi tỉnh/thành phố được chọn
    const [districts, setDistricts] = useState([]); // State để lưu danh sách quận/huyện
    const [selectedDistrict, setSelectedDistrict] = useState(''); // Theo dõi quận/huyện được chọn
    const [communes, setCommunes] = useState([]); // State để lưu danh sách xã/phường
    const [selectedCommune, setSelectedCommune] = useState(''); // Theo dõi xã/phường được chọn
    const { fetchUser } = useAuth();
    useEffect(() => {
        if (data) {
            setUsername(data.username || '');
            setName(data.full_name || '');
            setEmail(data.email || '');
            setPhone(data.phone || '');
            setAvatar(data.avatar || default_avatar);
            setAddress(data.address || '');
            setSelectedProvince(data.province || '');
            setSelectedDistrict(data.district || '');
            setSelectedCommune(data.ward || '');
        }
    }, [data]);

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

    const handleAvatarChange = async (event) => {
        const file = event.target.files[0]; // Lấy tệp từ input
        if (file) {
            setAvatar(file); // Cập nhật trạng thái avatar

            // Đọc và hiển thị ảnh bằng FileReader
            const reader = new FileReader();
            reader.onload = (e) => {
                const imageSrc = e.target.result; // Dữ liệu URL của ảnh
                document.getElementById('avatarPreview').src = imageSrc; // Đặt URL vào thẻ <img> để hiển thị ảnh
            };
            reader.readAsDataURL(file); // Đọc file dưới dạng Data URL
        }
    };
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const UserProfileRequest = {
            full_name: name,
            email: email,
            phone: phone,
            address: address,
            province: selectedProvince,
            district: selectedDistrict,
            ward: selectedCommune,
        };
        // console.log(UserProfileRequest);
        try {
            await updateProfileToAPI(UserProfileRequest);
            if (avatar && avatar !== default_avatar) {
                console.log(avatar !== default_avatar);
                console.log(data.avatar);
                await updateAvatarToAPI(avatar);
            }
        } catch (error) {
            console.error('Error updating userprofile:', error);
            notification.error({
                message: 'Có lỗi xảy ra!',
                description: 'Không thể cập nhật hồ sơ. Vui lòng thử lại.',
            });
        } finally {
            setLoading(false);
            notification.success({
                message: 'Cập nhật hồ sơ thành công!',
                description: 'Hồ sơ đã được cập nhật.',
                duration: '1',
            });
            fetchUser();
            navigate('/userprofile');
        }
    };

    return (
        <div className="border p-3 bg-slate-100 rounded-lg">
            <div></div>
            <div className="flex justify-center">
                <div className="grid grid-cols-2 grid-rows-7 gap-4">
                    <span>Tên đăng nhập</span>
                    <Input value={username} disabled></Input>
                    <span>Tên</span>
                    <Input value={name} onChange={(e) => setName(e.target.value)}></Input>
                    <span>Email</span>
                    <Input value={email} onChange={(e) => setEmail(e.target.value)}></Input>
                    <span>Số điện thoại</span>
                    <Input value={phone} onChange={(e) => setPhone(e.target.value)}></Input>
                    <span className="">Tỉnh / Thành phố</span>
                    <select
                        value={selectedProvince}
                        onChange={handleProvinceChange}
                        className="block w-full p-[8px] border rounded-md"
                        required
                    >
                        <option>{data.province || 'Chọn Tỉnh/Thành Phố'}</option>
                        {provinces.map((province) => (
                            <option key={province.code} value={province.name}>
                                {province.name}
                            </option>
                        ))}
                    </select>
                    <span className="">Quận / Huyện</span>
                    <select
                        value={selectedDistrict}
                        onChange={handleDistrictChange}
                        disabled={!selectedProvince}
                        className="block w-full p-[8px] border rounded-md "
                        required
                    >
                        <option> {selectedDistrict || 'Chọn Quận/Huyện'} </option>
                        {districts.map((district) => (
                            <option key={district.code} value={district.name}>
                                {district.name}
                            </option>
                        ))}
                    </select>

                    <span className="">Phường / Xã</span>
                    <select
                        value={selectedCommune}
                        onChange={handleCommuneChange}
                        disabled={!selectedDistrict}
                        className="block w-full p-[8px] border rounded-md "
                        required
                    >
                        <option>{selectedCommune || 'Chọn Xã/Phường'}</option>
                        {communes.map((commune) => (
                            <option key={commune.code} value={commune.name}>
                                {commune.name}
                            </option>
                        ))}
                    </select>
                    <span>Địa chỉ</span>
                    <Input value={address} onChange={(e) => setAddress(e.target.value)}></Input>
                    <div className="">
                        {loading && <Spin className="mr-2"></Spin>}
                        <button
                            onClick={handleSubmit}
                            className="bg-black text-white w-[200px] h-[48px] rounded-lg hover:bg-[#3C3D37] transition duration-300 ml-4"
                        >
                            Lưu
                        </button>
                    </div>
                </div>

                <div className=" flex mx-auto flex-col items-center ">
                    <img id="avatarPreview" src={avatar} alt="" className=" h-[200px] w-[200px] rounded-full " />
                    <input className="mt-2" type="file" accept="image/*" onChange={handleAvatarChange}></input>
                </div>
            </div>
        </div>
    );
}

export default UserIn4;
