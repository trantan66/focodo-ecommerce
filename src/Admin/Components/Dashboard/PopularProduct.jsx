import classNames from 'classnames'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchProductsBestSellerFromAPI } from '../../../Services/ProductService';
import { formatCurrency } from '../../../utils/FormatCurrency';

function PopularProduct() {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		const fetchCategories = async () => {
		  try {
			const { data } = await fetchProductsBestSellerFromAPI();
			setProducts(data);
		  } catch (error) {
			console.error("Lỗi khi lấy danh mục:", error);
		  }
		};
		fetchCategories();
	  }, []);
	return (
		<div className="w-[20rem] bg-[#282941] p-4 rounded-sm">
			<strong className="text-white font-medium">Sản phẩm bán chạy</strong>
			<div className="mt-4 flex flex-col gap-3">
				{products.map((product) => (
					<Link
						key={product.id}
						to={`product/productdetail/${product.id}`}
						className="flex items-start hover:no-underline"
					>
						<div className="w-10 h-10 min-w-[2.5rem] bg-gray-200 rounded-sm">
							<img
								className="w-full h-full object-cover rounded-sm"
								src={product.image}
								alt={product.name}
							/>
						</div>
						<div className="ml-4 flex-1">
							<p className="text-sm text-white ">{product.name}</p>
							<span
								className={classNames(
									product.quantity === 0
										? 'text-red-500'
										: product.quantity > 50
										? 'text-green-500'
										: 'text-amber-300',
									'text-xs font-medium'
								)}
							>
								Còn: {product.quantity === 0 ? 'Hết hàng' : product.quantity}
							</span>
							<span className='text-xs text-[#05B6DD] pl-4'>Đã bán: {product.sold_quantity}</span>
						</div>
						<div className="text-xs text-white pl-1.5">{formatCurrency(product.sell_price)}</div>
					</Link>
				))}
			</div>
		</div>
	)
}

export default PopularProduct