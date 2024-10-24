import React, { useState } from 'react';

function Login() {
    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="h-screen flex items-center justify-center bg-gradient-to-r from-green-400 to-green-600">
            <div className="bg-white p-8 rounded-lg shadow-md w-96 space-y-5">
                <h2 className="text-2xl font-semibold text-center text-[#0B847A]">LOGIN</h2>
                <form className="space-y-10">
                    <div>
                        <input
                            type="text"
                            id="username"
                            className="mt-1 block w-full h-[60px] border border-gray-300 rounded-md p-2"
                            placeholder="Username"
                            required
                        />
                    </div>
                    <div>
                        <input
                            type={showPassword ? 'text' : 'password'} // Chỉnh sửa đây
                            id="password"
                            className="mt-1 block w-full h-[60px] border border-gray-300 rounded-md p-2"
                            placeholder="Password"
                            required
                        />
                        <div className="flex items-center mt-2">
                            <input
                                type="checkbox"
                                id="show-password"
                                className="mr-2"
                                checked={showPassword}
                                onChange={handleTogglePassword}
                            />
                            <label htmlFor="show-password" className="text-sm">
                                Show Password
                            </label>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="w-[125px] bg-[#0B847A] text-white py-2 rounded-md hover:bg-green-600"
                        >
                            Sign in
                        </button>
                    </div>
                    <div>
                        <p className="text-center">
                            Forgot{' '}
                            <a href="#" className="text-[#0B847A] hover:text-[#0B847A80] focus:text-[#0B847A80]">
                                Password
                            </a>{' '}
                            ?
                        </p>
                        <p className="text-center">
                            Don't you have an account?{' '}
                            <a href="#" className="text-[#0B847A] hover:text-[#0B847A80] focus:text-[#0B847A80]">
                                Sign up
                            </a>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
