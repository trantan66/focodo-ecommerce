import React from 'react';
import AdressDetail from './AdressDetail';
import { UserData } from '../UserProfile/UserData';
import { Product_Items } from '../Product/Product_Items';
import OrderContent from './OrderContent';
import { Button } from 'antd';

function Content() {
    const product1 = Product_Items[0];
    const product2 = Product_Items[1];
    const product3 = Product_Items[2];
    const ship = 20000;
    const totalprice = parseInt(product1.price) + parseInt(product2.price) + parseInt(product3.price);
    const total = ship + totalprice;
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    };
    return (
        <div className="flex flex-col">
            <AdressDetail
                name={UserData[0].name}
                address={UserData[0].address}
                ward={UserData[0].ward}
                district={UserData[0].district}
                province={UserData[0].province}
                number={UserData[0].phoneNumber}
            ></AdressDetail>
            <div className="overflow-auto h-[250px] border-t border-b border-gray-300">
                <OrderContent
                    name={product1.name}
                    img={product1.image}
                    quantity={product1.quantity}
                    price={product1.price}
                ></OrderContent>
                <OrderContent
                    name={product2.name}
                    img={product2.image}
                    quantity={product2.quantity}
                    price={product2.price}
                ></OrderContent>
                <OrderContent
                    name={product3.name}
                    img={product3.image}
                    quantity={product3.quantity}
                    price={product3.price}
                ></OrderContent>
            </div>
            <div className="grid grid-cols-2 grid-rows-4 gap-2 px-5 my-4">
                <p className="ml-auto text-[13px] italic">Tổng tiền hàng</p>
                <p className="ml-auto text-[13px] italic">{formatCurrency(totalprice)}</p>
                <p className="ml-auto text-[13px] italic">Phí vận chuyển</p>
                <p className="ml-auto text-[13px] italic">{formatCurrency(ship)}</p>
                <p className="ml-auto text-[13px] italic">Giảm giá phí vận chuyển</p>
                <p className="ml-auto text-[13px] italic">{formatCurrency(0)}</p>
                <p className="ml-auto text-[18px] font-semibold">Thành tiền</p>
                <p className="ml-auto text-[18px] font-semibold text-red-500 italic">{formatCurrency(total)}</p>
            </div>
            <Button className="ml-auto mr-5 my-2 w-[15%] ">Quay lại</Button>
        </div>
    );
}

export default Content;
