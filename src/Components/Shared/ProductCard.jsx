import { StarFilled, StarOutlined } from '@ant-design/icons';
import React from 'react';
import Rating from 'react-rating';
import { formatCurrency } from '../../utils/FormatCurrency.js';
const ProductCard = ({ product }) => {
    return (
        <div key={product.id} className="bg-[#F6F6F6] p-[15px] rounded-[8px]">
            <a href={`/productdetail/${product.id}`}>
                <img src={product.image} alt={product.name} className="w-full h-[200px] object-cover" />
            </a>

            <div className="text-[17px] font-semibold mt-[8px] h-[26px] line-clamp-1">
                <p className="">{product.name}</p>
            </div>

            <div className="flex mt-[8px]">
                {product.review !== 'NaN' ? (
                    <Rating
                        initialRating={product.review}
                        emptySymbol={<StarOutlined className="text-[#FFDF00]" />}
                        fullSymbol={<StarFilled className="text-[#FFDF00]" />}
                        readonly
                    />
                ) : (
                    <div className="text-[14px] text-[#a79f9f] font-medium italic">Chưa có đánh giá</div>
                )}
            </div>

            <div className="flex items-center mt-[8px] gap-2">
                <div>
                    <span className="text-[15px] font-bold text-red-500">{formatCurrency(product.sell_price)}</span>
                </div>
                {product.sell_price !== product.original_price && (
                    <div className="flex items-center gap-2">
                        <div>
                            <span className="text-[15px] text-gray-500 line-through">
                                {formatCurrency(product.original_price)}
                            </span>
                        </div>
                        <div className="flex items-center justify-center leading-[18px] h-[18px] p-[5px] bg-green-500 rounded-[8px]">
                            <span className="inline-block text-white font-bold text-[15px]">
                                {product.discount * 100}%
                            </span>
                        </div>
                    </div>
                )}
            </div>

            <div className="flex items-center mt-[10px]">
                <a
                    href={`/productdetail/${product.id}`}
                    className="inline-block font-semibold text-[14px] px-[20px] py-[6px] rounded-[8px] text-black bg-[#ffffffeb] border-[1px] border-black hover:no-underline hover:text-white hover:bg-black"
                >
                    Mua ngay
                </a>
            </div>
        </div>
    );
};

export default ProductCard;
