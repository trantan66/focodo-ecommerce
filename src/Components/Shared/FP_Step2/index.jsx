import React, { useState, useEffect } from 'react';
import logo from '../image/logo.png';

function FP_Step2() {
    const [seconds, setSeconds] = useState(60);

    // Countdown effect
    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="bg-[#F0F4F9] h-screen flex items-center justify-center">
            <div className="bg-white w-[600px] h-[300px] rounded-lg shadow-lg flex flex-col items-center p-6">
                <div className="flex flex-col items-center mb-4">
                    <img src={logo} alt="Logo" className="w-24 h-auto mb-2" />
                    <h1 className="text-2xl font-semibold text-[#0B847A]">Nhật Minh</h1>
                </div>
                <div className="flex flex-col w-full">
                    {/* Countdown Timer */}
                    <div className="text-center mb-2">
                        {seconds > 0 ? (
                            <p className="text-gray-500">Thời gian còn lại: {seconds} giây</p>
                        ) : (
                            <p className="text-red-500">Thời gian đã hết!</p>
                        )}
                    </div>
                    {/* Input and Button */}
                    <div className="flex w-full">
                        <input
                            type="text"
                            placeholder="Input your OTP"
                            className="block w-[400px] h-[50px] border border-gray-300 rounded-l-md p-2 focus:outline-none focus:ring-2 focus:ring-[#0B847A]"
                        />
                        <button className="bg-[#0B847A] text-white w-[150px] h-[50px] px-6 rounded-r-md hover:bg-[#0B847A80] transition ml-2">
                            Tiếp theo
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FP_Step2;
