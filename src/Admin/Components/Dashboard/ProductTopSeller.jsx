import React, { useEffect, useState } from 'react';
import { fetchProductsBestSeller } from '../../../Services/DashboardService';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../../../utils/FormatCurrency';
import classNames from 'classnames';

function ProductTopSeller() {
    const [products, setProduct] = useState([]);
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await fetchProductsBestSeller();
                setProduct(data);
            } catch (error) {
                console.error('Lỗi khi lấy sản phẩm:', error);
            }
        };
        fetchProduct();
    }, []);
    return (
        <div className="w-8/12 bg-[#282941] p-4 rounded-sm">
            <strong className="text-white font-medium">Sản phẩm bán chạy</strong>
            <div className="mt-3">
                <table className="w-full text-gray-400 border-x-gray-400">
                    <thead>
                        <tr className="bg-[#2E3044] h-10">
                            <td className="pl-2">Sản phẩm</td>
                            <td className="text-center">Đã bán</td>
                            <td className="text-right">Giá bán</td>
                            <td className="text-center">Số lượng</td>
                        </tr>
                    </thead>
                    <tbody className="h-[50vh]">
                        {products.map((items) => (
                            <tr>
                                <td>
                                    <div className="flex flex-row gap-2 items-center">
                                        <img src={items.image} alt="product" className="w-10 h-10 rounded-md" />
                                        <Link
                                            to={`/admin/product/productdetail/${items.id}`}
                                            className="text text-sm font-semibold text-[#787BFF]"
                                        >
                                            {items.name}
                                        </Link>
                                    </div>
                                </td>
                                <td className="text-center">{items.sold_quantity}</td>
                                <td className="text-right">{formatCurrency(items.sell_price)}</td>
                                <td className="text-center">
                                    <span
                                        className={classNames(
                                            items.quantity === 0
                                                ? 'capitalize py-1 px-2 rounded-md text-xs bg-red-300 text-red-500'
                                                : items.quantity > 50
                                                ? 'capitalize py-1 px-2 rounded-md text-xs bg-green-200 text-green-800'
                                                : 'capitalize py-1 px-2 rounded-md text-xs bg-amber-100 text-amber-400',
                                            'text-xs font-medium',
                                        )}
                                    >
                                        {items.quantity === 0 ? 'Hết hàng' : items.quantity}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ProductTopSeller;
