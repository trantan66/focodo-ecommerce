import React, { useState } from 'react';
import logo from '../image/logo.png';

function ResetPassword() {
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle password reset logic here
    };

    return (
        <div className="bg-[#F0F4F9] h-screen flex items-center justify-center">
            <div className="bg-white w-[600px] rounded-lg shadow-lg flex flex-col p-6">
                <div className="flex flex-col items-center mb-4">
                    <img src={logo} alt="Logo" className="w-24 h-auto mb-2" />
                    <h1 className="text-2xl font-semibold text-[#0B847A]">Đặt lại mật khẩu</h1>
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col w-full">
                    {/* Email Input */}
                    <div className="mb-4">
                        <input
                            type="email"
                            placeholder="Nhập email của bạn"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="block w-full h-[50px] border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#0B847A]"
                            required
                        />
                    </div>
                    {/* New Password Input */}
                    <div className="mb-4">
                        <input
                            type="password"
                            placeholder="Mật khẩu mới"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="block w-full h-[50px] border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#0B847A]"
                            required
                        />
                    </div>
                    {/* Confirm Password Input */}
                    <div className="mb-4">
                        <input
                            type="password"
                            placeholder="Xác nhận mật khẩu mới"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="block w-full h-[50px] border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#0B847A]"
                            required
                        />
                    </div>
                    {/* Submit Button */}
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="w-full bg-[#0B847A] text-white py-2 rounded-md hover:bg-[#0B847A80] transition"
                        >
                            Xác nhận
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ResetPassword;
