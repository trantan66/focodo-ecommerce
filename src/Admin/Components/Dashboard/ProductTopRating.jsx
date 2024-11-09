import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchProductsTopRating } from '../../../Services/DashboardService';
import { StarFilled, StarOutlined } from '@ant-design/icons';
import Rating from 'react-rating';

function ProductTopRating() {
    const [products, setProduct] = useState([]);
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await fetchProductsTopRating();
                setProduct(data);
            } catch (error) {
                console.error('Lỗi khi lấy sản phẩm:', error);
            }
        };
        fetchProduct();
    }, []);
    return (
        <div className="w-4/12 bg-[#282941] p-4 rounded-sm">
            <strong className="text-white font-medium mb-6">Sản phẩm bán chạy</strong>
            <div className="pb-3"></div>
            {products.map((product) => (
                <Link
                    key={product.id}
                    to={`product/productdetail/${product.id}`}
                    className="flex items-start hover:no-underline"
                >
                    <div className="w-10 h-10 min-w-[2.5rem] bg-gray-200 rounded-sm">
                        <img className="w-full h-full object-cover rounded-sm" src={product.image} alt={product.name} />
                    </div>
                    <div className="ml-4 flex-1">
                        <p className="text-sm text-white ">{product.name}</p>
                        <div className="text-xs text-white">
                            {
                                <Rating
                                    initialRating={product.review}
                                    emptySymbol={<StarOutlined className="text-[#696CFF]" />}
                                    fullSymbol={<StarFilled className="text-[#696CFF]" />}
                                    readonly
                                />
                            }
                        </div>
                        <span
                            className={classNames(
                                product.quantity === 0
                                    ? 'text-red-500'
                                    : product.quantity > 50
                                    ? 'text-green-500'
                                    : 'text-amber-300',
                                'text-xs font-medium',
                            )}
                        >
                            Còn: {product.quantity === 0 ? 'Hết hàng' : product.quantity}
                        </span>
                        <span className="text-xs text-[#05B6DD] pl-4">Đã bán: {product.sold_quantity}</span>
                    </div>
                </Link>
            ))}
        </div>
    );
}

export default ProductTopRating;
