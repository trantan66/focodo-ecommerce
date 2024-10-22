import React, { useState } from 'react';
import ProductList from './ProductList';
import { Product_Items } from '../Product/Product_Items';
import { Rate } from 'antd';
import TextArea from 'antd/es/input/TextArea';
const desc = ['Rất tệ', 'Tệ', 'Bình thường', 'Tốt', 'Tuyệt vời'];
function Content() {
    const [value, setValue] = useState(3);
    return (
        <div className="flex flex-col w-[60%] mx-auto bg-gray-100 p-3 my-3 rounded-lg gap-3">
            <p className="text-[20px] font-semibold mb-3 ">Đánh giá sản phẩm</p>
            <div className="h-[100px] overflow-auto border rounded-lg px-2 py-1">
                <ProductList img={Product_Items[0].image} name={Product_Items[0].name}></ProductList>
                <ProductList img={Product_Items[1].image} name={Product_Items[1].name}></ProductList>
                <ProductList img={Product_Items[2].image} name={Product_Items[2].name}></ProductList>
            </div>
            <div className="flex gap-6 mt-2">
                <span className="">Chất lượng sản phẩm</span>
                <div className="flex mt-1">
                    <Rate tooltips={desc} onChange={setValue} value={value} />
                    {value ? <span className="mx-2 text-[13px]">{desc[value - 1]}</span> : null}
                </div>
            </div>
            <div className="">
                <p className="my-2">Bình luận</p>
                <TextArea
                    className="w-full"
                    showCount
                    maxLength={100}
                    placeholder="Để lại bình luận ở đây"
                    style={{
                        height: 120,
                        resize: 'none',
                    }}
                />
            </div>
            <div className="flex ml-auto gap-3 mr-3 my-4">
                <button className=" bg-[#FAF7F0] text-black border border-black w-[150px] h-[50px] rounded-lg hover:bg-[#D8D2C2] transition duration-300 ">
                    TRỞ LẠI
                </button>
                <button className="bg-black text-white w-[150px] h-[50px] rounded-lg hover:bg-[#3C3D37] transition duration-300 ml-4">
                    HOÀN THÀNH
                </button>
            </div>
        </div>
    );
}

export default Content;
