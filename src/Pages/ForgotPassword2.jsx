import React, { useEffect, useState } from 'react';
import { callVerifyOtp, callVerifyEmail } from '../Services/UserService';
import { useNavigate, useLocation } from 'react-router-dom';

const ForgotPassword2 = () => {
    const [otp, setOtp] = useState('');
    const [timer, setTimer] = useState(60);
    const [isTimerActive, setIsTimerActive] = useState(true);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false); // Trạng thái loading cho xác thực OTP
    const [isResendLoading, setIsResendLoading] = useState(false); // Trạng thái loading cho gửi lại OTP

    const navigate = useNavigate();
    const location = useLocation();
    const { email } = location.state || {};

    useEffect(() => {
        let interval = null;
        if (isTimerActive && timer > 0) {
            interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);
        } else if (timer === 0) {
            setIsTimerActive(false);
        }
        return () => clearInterval(interval);
    }, [isTimerActive, timer]);

    const handleConfirmClick = async () => {
        if (!otp) {
            setError('Vui lòng nhập mã OTP của bạn');
        } else {
            setError('');
            setIsLoading(true); // Bắt đầu trạng thái loading
            try {
                const res = await callVerifyOtp(email, otp);
                if (res && res.result) {
                    navigate('/forgotpassword3', { state: { email } });
                } else {
                    setError('Mã OTP không hợp lệ');
                }
            } catch (error) {
                setError('Có lỗi khi xác thực OTP');
            }
            setIsLoading(false); // Kết thúc trạng thái loading
        }
    };

    const handleResendOtp = async () => {
        setTimer(60);
        setIsTimerActive(true);
        setError('');
        setIsResendLoading(true); // Bắt đầu trạng thái loading cho gửi lại OTP
        try {
            const res = await callVerifyEmail(email);
            if (res && res.result) {
                alert('Thành công! Mã OTP đã được gửi lại');
            } else {
                setError('Có lỗi xảy ra khi gửi lại mã OTP');
            }
        } catch (error) {
            alert('Có lỗi xảy ra khi gửi lại mã OTP');
        }
        setIsResendLoading(false); // Kết thúc trạng thái loading
    };

    return (
        <div className="max-w-[1200px] mx-auto">
            <section className="bg-gray-50 dark:bg-gray-900 h-[600px] flex items-center justify-center">
                <div className="w-full bg-white rounded-lg shadow-md sm:max-w-md p-6">
                    <h1 className="text-xl font-bold text-gray-900 mb-4 text-center">Nhập mã OTP</h1>

                    <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-2">
                        Nhập mã OTP đã gửi đến email của bạn
                    </label>
                    <input
                        type="text"
                        id="otp"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                        placeholder="Mã OTP"
                    />

                    {error && <div className="mb-4 p-2 text-sm text-red-600 bg-red-100 rounded">{error}</div>}

                    <button
                        onClick={handleConfirmClick}
                        disabled={isLoading} // Vô hiệu hóa khi đang tải
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

                    <div className="mt-4 text-center">
                        {isTimerActive ? (
                            <div>
                                <span className="text-sm text-gray-700">Thời gian còn lại: {timer}s</span>
                            </div>
                        ) : (
                            <div>
                                <span className="text-sm text-gray-700">Thời gian hết hạn!</span>
                                <button
                                    onClick={handleResendOtp}
                                    disabled={isResendLoading} // Vô hiệu hóa khi đang tải lại OTP
                                    className={`text-blue-600 hover:underline ml-2 ${
                                        isResendLoading ? 'opacity-70 cursor-not-allowed' : ''
                                    }`}
                                >
                                    {isResendLoading ? (
                                        <div className="flex items-center justify-center">
                                            <svg
                                                className="w-4 h-4 mr-1 text-blue-600 animate-spin"
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
                                            Đang gửi...
                                        </div>
                                    ) : (
                                        'Gửi lại mã'
                                    )}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ForgotPassword2;
