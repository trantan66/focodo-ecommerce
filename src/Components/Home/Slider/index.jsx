import React from 'react';
import chacuahue from '../image/chacuahue.jpg';
import banhxeonemlui from '../image/banhxeo-nemlui.jpg';
import banhnam from '../image/banhnam.jpg';
import mexung from '../image/mexung.jpg';
function Slider() {
    return (
        <>
            <div className="grid grid-cols-4 grid-rows-2 grid-flow-col w-full h-[600px] bg-blue-500">
                <div className="w-full h-full">
                    <img src={chacuahue} alt="Cha Cua Hue" />
                </div>
                <div className="grid grid-cols-5 grid-rows-1 grid-flow-col w-full h-full">
                    <div className="col-span-2">
                        <img src={banhxeonemlui} alt="Bánh xèo - Nem lụi" className="w-full h-full object-cover" />
                    </div>
                    <div className="col-span-3" style={{ backgroundColor: '#EDEDED' }}>
                        <p className="italic text-3xl font-normal text-left ml-[35px] mt-[20px]">Nem lụi</p>
                        <p className="italic text-3xl font-normal text-left ml-[35px]">Bánh xèo</p>
                        <p className="italic text-gray-500 ml-[35px] mr-[35px] mt-[20px]">
                            Nem lụi - Bánh xèo là đặc sản Quảng Nam - Đà Nẵng nhưng Huế cũng nổi tiếng không kém
                        </p>
                    </div>
                </div>
                <div className="w-full h-full bg-white">
                    <p className="italic text-5xl font-normal text-left ml-[35px] mt-[75px]">Chả Cua Huế</p>
                    <p className="italic ml-[35px] mr-[35px] mt-[20px]">Chả Cua Huế là đặc sản ẩm thực cố đô Huế</p>
                </div>
                <div className="grid grid-cols-5 grid-rows-1 grid-flow-col w-full h-full">
                    <div className="col-span-2">
                        <img src={banhnam} alt="Bánh nậm" className="w-full h-full object-cover" />
                    </div>
                    <div className="col-span-3" style={{ backgroundColor: '#353535' }}>
                        <p className="italic text-3xl font-normal text-left ml-[35px] mt-[75px] text-white">Bánh Nậm</p>
                        <p className="italic text-white ml-[35px] mr-[35px] mt-[20px]">
                            Loại bánh dân dã nổi tiếng của ẩm thực xứ cố đô
                        </p>
                    </div>
                </div>
                <div className="row-span-2" style={{ backgroundColor: '#EDEDED' }}>
                    <p className="italic text-5xl font-normal text-left ml-[50px] mt-[150px] text-black">Mè Xửng</p>
                    <p className="italic text-xl font-normal text-left ml-[50px] mt-[25px] text-black">
                        Món đặc sản mà bất cứ ai đến với vùng đất cố đô cũng muốn mang về làm quà
                    </p>
                </div>
                <div className="row-span-2 w-full h-full" style={{ backgroundColor: '#EDEDED' }}>
                    <img src={mexung} alt="Mè xửng" className="w-[300px] h-[500px] mt-[50px] ml-auto object-cover" />
                </div>
            </div>
        </>
    );
}

export default Slider;
