import { Input } from 'antd';
import React, { useState, useEffect } from 'react';
import { register } from '../Services/AuthService';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    // useEffect để clear các ô input khi component được render
    useEffect(() => {
        setFullName('');
        setEmail('');
        setPhone('');
        setUsername('');
        setPassword('');
    }, []);

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await register({ fullName, email, phone, username, password });
            if (response && response.result) {
                setFullName('');
                setEmail('');
                setPhone('');
                setUsername('');
                setPassword('');
                navigate('/login', { replace: true });
            }
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div className="max-w-[1200px] mx-auto">
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto">
                    <div className="w-full bg-white rounded-lg shadow dark:border sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Đăng ký
                            </h1>
                            <form className="space-y-4 md:space-y-6">
                                <div>
                                    <label
                                        htmlFor="full_name"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Họ và tên
                                    </label>
                                    <Input
                                        value={fullName}
                                        name="full_name"
                                        id="full_name"
                                        className="w-full p-2.5 text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Nhập họ và tên"
                                        required
                                        onChange={(e) => setFullName(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Email
                                    </label>
                                    <Input
                                        value={email}
                                        type="email"
                                        name="email"
                                        id="email"
                                        className="w-full p-2.5 text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Nhập email"
                                        required
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="phone"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Số điện thoại
                                    </label>
                                    <Input
                                        value={phone}
                                        name="phone"
                                        id="phone"
                                        className="w-full p-2.5 text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Nhập số điện thoại"
                                        required
                                        onChange={(e) => setPhone(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="username"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Tên đăng nhập
                                    </label>
                                    <Input
                                        value={username}
                                        name="username"
                                        id="username"
                                        className="w-full p-2.5 text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Nhập tên đăng nhập"
                                        required
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
                                        className="w-full p-2.5 text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Nhập mật khẩu"
                                        required
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full text-white bg-primaryColor focus:outline-none hover:opacity-[0.95] font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                    onClick={handleRegister}
                                >
                                    Đăng ký
                                </button>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Đã có tài khoản?{' '}
                                    <Link
                                        to="/login"
                                        className="font-medium text-primary-600 hover:no-underline dark:text-primary-500"
                                    >
                                        Đăng nhập
                                    </Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Register;
