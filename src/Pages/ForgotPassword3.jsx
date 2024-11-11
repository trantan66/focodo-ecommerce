import React, { useState } from 'react';
import { callResetPassword } from '../Services/UserService';
import { useNavigate, useLocation } from 'react-router-dom';

const ForgotPassword3 = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const location = useLocation(); // Lấy thông tin từ location
    const { email } = location.state || {}; // Lấy giá trị email từ state, nếu có

    const handleConfirmClick = async () => {
        if (!newPassword || !confirmPassword) {
            setError('Vui lòng nhập tất cả các trường');
        } else if (newPassword !== confirmPassword) {
            setError('Mật khẩu không khớp');
        } else if (newPassword.length < 6) {
            setError('Mật khẩu phải có ít nhất 6 kí tự');
        } else {
            setError('');
            // Logic để đặt lại mật khẩu sẽ được thực hiện ở đây
            const res = await callResetPassword(email, newPassword);
            if (res && res.result) {
                alert('Cập nhật mật khẩu thành công!');
                navigate('/login'); // Chuyển về màn hình đăng nhập
            } else {
                setError('Có lỗi xảy ra, vui lòng thử lại');
            }
        }
    };

    return (
        <div className="max-w-[1200px] mx-auto">
            <section className="bg-gray-50 dark:bg-gray-900 h-[600px] flex items-center justify-center">
                <div className="w-full bg-white rounded-lg shadow-md sm:max-w-md p-6">
                    <h1 className="text-xl font-bold text-gray-900 mb-4 text-center">Đặt lại mật khẩu</h1>

                    <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 mb-2">
                        Mật khẩu mới
                    </label>
                    <input
                        type="password"
                        id="new-password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                        placeholder="Mật khẩu mới"
                    />

                    <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-2">
                        Xác nhận mật khẩu
                    </label>
                    <input
                        type="password"
                        id="confirm-password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                        placeholder="Xác nhận mật khẩu"
                    />

                    {error && <div className="mb-4 p-2 text-sm text-red-600 bg-red-100 rounded">{error}</div>}

                    <button
                        onClick={handleConfirmClick}
                        className="w-full text-white bg-primaryColor focus:outline-none hover:opacity-[0.95] font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                        Đặt lại mật khẩu
                    </button>
                </div>
            </section>
        </div>
    );
};

export default ForgotPassword3;
