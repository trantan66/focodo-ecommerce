import React, { useState } from 'react';
import logo from '../Shared/image/logo.png';
import emailjs from 'emailjs-com';
import { notification } from 'antd';

function Contact() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');

    const handleSendEmail = (e) => {
        e.preventDefault();

        if (!fullName || !email || !phone || !message) {
            notification.error({
                message: 'Thất bại!',
                description: 'Vui lòng nhập đầy đủ thông tin',
                duration: '1',
            });
            return;
        }

        const templateParams = {
            fullName,
            email,
            phone,
            message,
        };

        emailjs.send('service_vo5o8an', 'template_qfyt3zv', templateParams, 'px-JuFgcGBVNELmF0').then(
            (response) => {
                console.log('SUCCESS!', response.status, response.text);
                notification.success({
                    message: 'Thành công!',
                    description: 'Thông tin của bạn đã được gửi thành công!',
                    duration: '1',
                });
                setFullName('');
                setEmail('');
                setPhone('');
                setMessage('');
            },
            (error) => {
                console.log('FAILED...', error);
                notification.error({
                    message: 'Thất bại!',
                    description: 'Gửi thông tin thất bại, vui lòng thử lại.',
                    duration: '1',
                });
            },
        );
    };

    return (
        <div className="w-[1200px] flex justify-between mx-auto py-4">
            <div className="w-[575px] space-y-4">
                <h1 className="text-2xl font-medium uppercase">Nơi giải đáp toàn bộ thắc mắc của bạn</h1>
                <h3 className="font-medium">
                    Email: <span className="text-orange-500">dacsanhuefocodo@gmail.com</span>
                </h3>
                <h3 className="font-medium">
                    Hotline: <span className="text-orange-500">0911.85.8888 | 0977.33.7979</span>
                </h3>
                <h3 className="font-medium">Liên hệ với chúng tôi</h3>
                <form onSubmit={handleSendEmail}>
                    <div className="flex justify-between">
                        <input
                            type="text"
                            placeholder="Họ và tên"
                            className="border border-gray-300 rounded h-[40px] pl-3 w-[47%]"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            required
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            className="border border-gray-300 rounded h-[40px] pl-3 w-[47%]"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <input
                        type="text"
                        placeholder="Điện thoại"
                        className="border border-gray-300 rounded h-[40px] pl-3 w-[100%] mt-3"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                    <textarea
                        name=""
                        id=""
                        placeholder="Nhập nội dung tại đây"
                        className="w-full h-[120px] border border-gray-300 rounded-lg p-3 mt-3"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                    />
                    <button type="submit" className="bg-black text-white rounded w-[47%] h-[40px] mt-3">
                        Gửi thông tin
                    </button>
                </form>
            </div>
            <div className="w-[575px] space-y-3">
                <div className="w-[200px] h-[200px]">
                    <img src={logo} alt="address-focodo" className="w-full h-full object-cover" />
                </div>
                <div className="space-y-5 font">
                    <h1 className="text-2xl font-medium uppercase">Các cơ sở của chúng tôi</h1>
                    <div className="">
                        <h3 className="font-medium">1. FOCODO Đà Nẵng</h3>
                        <p>54 Nguyễn Lương Bằng, phường Hòa Khánh Bắc, quận Liên Chiểu, TP Đà Nẵng</p>
                    </div>
                    <div className="">
                        <h3 className="font-medium">2. FOCODO Huế</h3>
                        <p>63 Phùng Hưng, Thuận Thành, Huế, Thừa Thiên Huế</p>
                    </div>
                    <div className="">
                        <h3 className="font-medium">3. FOCODO TP Hồ Chí Minh</h3>
                        <p>78 Quang Trung, Phước Long B, Quận 9, TP Hồ Chí Minh</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;
