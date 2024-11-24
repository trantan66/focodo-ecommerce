import React, { useState } from 'react';
import { callVerifyEmail } from '../Services/UserService';
import { useNavigate } from 'react-router-dom';

const ForgotPassword1 = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false); // Thêm trạng thái tải

    const navigate = useNavigate();

    const handleConfirmClick = async () => {
        if (!email) {
            setError('Vui lòng nhập email của bạn');
        } else {
            setError('');
            setIsLoading(true); // Bắt đầu trạng thái tải
            try {
                const res = await callVerifyEmail(email);
                if (res && res.result) {
                    navigate('/forgotpassword2', { state: { email } });
                } else {
                    setError('Email không tồn tại');
                }
            } catch (error) {
                setError('Có lỗi xảy ra khi gửi yêu cầu');
            }
            setIsLoading(false); // Kết thúc trạng thái tải
        }
    };

    const handleBack = () => {
        navigate('/login');
    };

    return (
        <div className="max-w-[1200px] mx-auto">
            <section className="bg-gray-50 dark:bg-gray-900 h-[600px] flex items-center justify-center">
                <div className="w-full bg-white rounded-lg shadow-md sm:max-w-md p-6">
                    <h1 className="text-xl font-bold text-gray-900 mb-4 text-center">Quên mật khẩu</h1>

                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Nhập email của bạn
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                        placeholder="Email"
                    />

                    {error && <div className="mb-4 p-2 text-sm text-red-600 bg-red-100 rounded">{error}</div>}

                    <button
                        onClick={handleConfirmClick}
                        disabled={isLoading} // Vô hiệu hóa nút khi đang tải
                        className={`w-full text-white bg-primaryColor focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center ${
                            isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:opacity-[0.95]'
                        }`}
                    >
                        {isLoading ? (
                            <div className="flex items-center justify-center">
                                <svg
                                    className="w-5 h-5 mr-2 text-white animate-spin"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                    ></path>
                                </svg>
                                Đang xử lý...
                            </div>
                        ) : (
                            'Xác nhận'
                        )}
                    </button>
                    <div className="flex justify-center mx-auto text-blue-500 mt-2 cursor-pointer" onClick={handleBack}>
                        Quay lại
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ForgotPassword1;
