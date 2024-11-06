import React, { useEffect, useState } from 'react';
import { callVerifyOtp, callVerifyEmail } from '../Services/UserService';
import { useNavigate, useLocation } from 'react-router-dom';

const ForgotPassword2 = () => {
    const [otp, setOtp] = useState('');
    const [timer, setTimer] = useState(60);
    const [isTimerActive, setIsTimerActive] = useState(true);
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const location = useLocation(); // Lấy thông tin từ location
    const { email } = location.state || {}; // Lấy giá trị email từ state, nếu có

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
            try {
                const res = await callVerifyOtp(email, otp); // Gọi API verify OTP

                if (res && res.result) {
                    navigate('/forgotpassword3', { state: { email } }); // Chuyển qua màn hình đặt mật khẩu mới
                } else {
                    setError('Mã OTP không hợp lệ');
                }
            } catch (error) {
                setError('Có lỗi khi xác thực OTP');
            }
        }
    };

    // Hàm gởi lại mã Otp
    const handleResendOtp = async () => {
        setTimer(60);
        setIsTimerActive(true);
        setError('');
        // Logic gửi lại mã OTP sẽ được thực hiện ở đây
        try {
            const res = await callVerifyEmail(email); // Gọi API gửi lại mã OTP

            if (res && res.result) {
                alert('Thành công Mã OTP đã được gửi lại');
            } else {
                setError('Có lỗi xảy ra khi gửi lại mã OTP');
            }
        } catch (error) {
            alert('Có lỗi xảy ra khi gửi lại mã OTP DB');
        }
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
                        className="w-full text-white bg-primaryColor focus:outline-none hover:opacity-[0.95] font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                        Xác nhận
                    </button>

                    <div className="mt-4 text-center">
                        {isTimerActive ? (
                            <div>
                                <span className="text-sm text-gray-700">Thời gian còn lại: {timer}s</span>
                            </div>
                        ) : (
                            <div>
                                <span className="text-sm text-gray-700">Thời gian hết hạn!</span>
                                <button onClick={handleResendOtp} className="text-blue-600 hover:underline ml-2">
                                    Gửi lại mã
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
