import { Input } from 'antd';
import React, { useEffect, useState } from 'react';
import { login } from '../Services/AuthService';
import { getUserFromToken } from '../Services/UserService';
import useAuth from '../Hooks/useAuth';
import { useNavigate, useLocation } from 'react-router-dom';
import useCart from '../Hooks/useCart';
const Login = () => {
    const { auth, setAuth } = useAuth();
    const { fetchCart, fetchNumberOfCart } = useCart();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await login(username, password);
            if (response && response.result) {
                localStorage.setItem('access_token', response.result.access_token);
                localStorage.setItem('refresh_token', response.result.refresh_token);

                const res = await getUserFromToken();
                if (res.code === 0) {
                    setAuth({ user: res.result });
                }
                setUsername('');
                setPassword('');
                if (res.result.role === 'ADMIN') {
                    navigate('/admin');
                } else {
                    navigate('/userprofile');
                    fetchCart();
                    fetchNumberOfCart();
                }
            }
        } catch (e) {
            setError('Sai tên đăng nhập hoặc mật khẩu');
            console.log(e);
        }
    };
    return (
        <div className="max-w-[1200px] mx-auto">
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto">
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Đăng nhập
                            </h1>
                            <form className="space-y-4 md:space-y-6" action="#">
                                <div>
                                    <label
                                        htmlFor="username"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Tên đăng nhập
                                    </label>
                                    <Input
                                        value={username}
                                        type="username"
                                        name="username"
                                        id="username"
                                        className="w-full p-2.5"
                                        placeholder="Nhập tên đăng nhập của bạn"
                                        required=""
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="password"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Mật khẩu
                                    </label>
                                    <Input
                                        value={password}
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="Mật khẩu"
                                        className="w-full p-2.5"
                                        required=""
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                {error && <div className="p-2 text-sm text-red-600 bg-red-100 rounded">{error}</div>}

                                <div className="flex items-center justify-between">
                                    <a
                                        href="forgotpassword1"
                                        className="text-sm font-medium text-primary-600 hover:no-underline dark:text-primary-500"
                                    >
                                        Quên mật khẩu?
                                    </a>
                                </div>
                                <button
                                    onClick={(e) => handleLogin(e)}
                                    type="submit"
                                    className="w-full text-white bg-primaryColor focus:outline-none hover:opacity-[0.95] font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                >
                                    Đăng nhập
                                </button>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Bạn chưa có tài khoản?{' '}
                                    <a
                                        href="/register"
                                        className="font-medium text-primary-600 hover:no-underline dark:text-primary-500"
                                    >
                                        Đăng ký
                                    </a>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Login;
