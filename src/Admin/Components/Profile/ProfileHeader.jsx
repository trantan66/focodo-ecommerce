import React from 'react';
import { FaCalendarCheck } from 'react-icons/fa';

function ProfileHeader({data}) {
    return (
        <div className="bg-[#282941] rounded-md mx-4 text-white relative">
            <div className="w-full">
                <img
                    src="https://img.freepik.com/free-vector/leafy-dragonfly-frame-background_53876-113009.jpg?t=st=1730371534~exp=1730375134~hmac=52eeb19633bccd7f03a58f814782b8409a1fc54027c982bacf3fa66c24e33384&w=996"
                    alt=""
                    className="w-full h-[20rem] object-cover rounded-md"
                />
            </div>

            <div className="absolute bottom-6 left-[15%] transform -translate-x-1/2 w-32 h-32 bg-[#282941] rounded-md border-4 border-[#282941] flex items-center justify-center">
                <img
                    src={data.avatar}
                    alt=""
                    className="w-full h-full object-cover rounded-md"
                />
            </div>

            <div className="h-24 bg-[#282941]">
                <div className="flex flex-col ml-72 mt-2">
                    <span className="text-3xl">{data.full_name}</span>
                    <div className="flex items-center mt-2">
                        <span>
                            <FaCalendarCheck />
                        </span>
                        <span className="ml-2">Ngày tạo: {data.created_date ? data.created_date : "Chưa có ngày tạo"}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileHeader;
