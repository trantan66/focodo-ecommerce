import React, { useState } from 'react';
import { callVerifyEmail } from '../Services/UserService';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const ForgotPassword1 = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleConfirmClick = async () => {
        if (!email) {
            setError('Vui lòng nhập email của bạn');
        } else {
            setError('');
            const res = await callVerifyEmail(email);
            if (res && res.result) {
                // Điều hướng hoặc logic chuyển bước sẽ được thực hiện ở đây
                navigate('/forgotpassword2', { state: { email } }); // Chuyển đến step 2 với state chứa email
            } else {
                setError('Email không tồn tại');
            }
        }
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
                        className="w-full text-white bg-primaryColor focus:outline-none hover:opacity-[0.95] font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                        Xác nhận
                    </button>
                </div>
            </section>
        </div>
    );
};

export default ForgotPassword1;
