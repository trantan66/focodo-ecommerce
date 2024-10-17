import { StarFilled, StarOutlined } from '@ant-design/icons'
import React from 'react'
import Rating from 'react-rating';

const ProductCard = ({product}) => {
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    };
  return (
    <div key={product.id} className="bg-[#F6F6F6] p-[15px]">
                            {/* image */}
                            <div className="">
                                <img src={product.image} alt={product.name} className="w-full h-[200px] object-cover" />
                            </div>

                            {/* Description */}
                            <div className="text-[18px] font-semibold mt-[8px]">
                                <p className="">{product.Name}</p>
                            </div>
                            <div className="flex mt-[8px]">
                                <Rating 
                                    initialRating = {product.rating}
                                    emptySymbol = {<StarOutlined className="text-yellow-500" />}
                                    fullSymbol={<StarFilled className="text-yellow-500" />}
                                    readonly
                                />
                            </div>
                            {/* Price */}
                                <div className="flex items-center mt-[8px] gap-2">
                                    <div>
                                        <span className="text-[15px] font-bold text-red-600">{formatCurrency(product.salePrice)}</span>
                                    </div>
                                    <div>
                                        <span className="text-[15px] text-gray-500 line-through">{formatCurrency(product.OriginalPrice)}</span>
                                    </div>
                                        <div className="flex items-center justify-center leading-[18px] h-[18px] p-[5px] bg-green-500 rounded-[8px]">
                                            <span className="inline-block text-white font-bold text-[15px]">{product.Discount}%</span>
                                        </div>
                                </div>

                            {/* rating */}
                            <div className = "flex items-center mt-[8px]">
                            <a href="" className = "inline-block font-semibold text-[14px] px-[20px] py-[6px] rounded-[8px] text-black bg-[#ffffffeb] border-[1px] border-black hover:no-underline hover:text-white hover:bg-black">Mua ngay</a>
                            </div>


                        </div>
  )
}

export default ProductCard