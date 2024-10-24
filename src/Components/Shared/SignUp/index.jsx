import React, { useState } from 'react';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons'; // Import Ant Design icons

function SignUp() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <div className="h-screen flex items-center justify-center bg-[#F0F4F9]">
            <div className="bg-white p-8 rounded-lg shadow-md w-96 space-y-5">
                <h2 className="text-2xl font-semibold text-center text-[#0B847A]">SIGN UP</h2>
                <form className="space-y-5">
                    <div className="flex items-center space-x-3">
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700 w-1/4">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            className="mt-1 block w-3/4 h-[40px] border border-gray-300 rounded-md p-2"
                            placeholder="Username"
                            required
                        />
                    </div>
                    <div className="relative flex items-center space-x-3">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 w-1/4">
                            Password
                        </label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            className="mt-1 block w-3/4 h-[40px] border border-gray-300 rounded-md p-2"
                            placeholder="Password"
                            required
                        />
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                            {showPassword ? (
                                <EyeInvisibleOutlined className="cursor-pointer" onClick={togglePasswordVisibility} />
                            ) : (
                                <EyeOutlined className="cursor-pointer" onClick={togglePasswordVisibility} />
                            )}
                        </div>
                    </div>
                    <div className="relative flex items-center space-x-3">
                        <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 w-1/4">
                            Confirm Password
                        </label>
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            id="confirm-password"
                            className="mt-1 block w-3/4 h-[40px] border border-gray-300 rounded-md p-2"
                            placeholder="Confirm Password"
                            required
                        />
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                            {showConfirmPassword ? (
                                <EyeInvisibleOutlined
                                    className="cursor-pointer"
                                    onClick={toggleConfirmPasswordVisibility}
                                />
                            ) : (
                                <EyeOutlined className="cursor-pointer" onClick={toggleConfirmPasswordVisibility} />
                            )}
                        </div>
                    </div>
                    <div className="flex items-center space-x-3">
                        <label htmlFor="full_name" className="block text-sm font-medium text-gray-700 w-1/4">
                            Full Name
                        </label>
                        <input
                            type="text"
                            id="full_name"
                            className="mt-1 block w-3/4 h-[40px] border border-gray-300 rounded-md p-2"
                            placeholder="Full Name"
                            required
                        />
                    </div>
                    <div className="flex items-center space-x-3">
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 w-1/4">
                            Phone
                        </label>
                        <input
                            type="text"
                            id="phone"
                            className="mt-1 block w-3/4 h-[40px] border border-gray-300 rounded-md p-2"
                            placeholder="Phone"
                            required
                        />
                    </div>
                    <div className="flex items-center space-x-3">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 w-1/4">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="mt-1 block w-3/4 h-[40px] border border-gray-300 rounded-md p-2"
                            placeholder="Email"
                            required
                        />
                    </div>
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="w-[125px] bg-[#0B847A] text-white py-2 rounded-md hover:bg-green-600"
                        >
                            Sign up
                        </button>
                    </div>
                    <div>
                        <p className="text-center">
                            Already have an account?{' '}
                            <a href="#" className="text-[#0B847A] hover:text-[#0B847A80] focus:text-[#0B847A80]">
                                Login
                            </a>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignUp;
