import classNames from 'classnames'
import React from 'react'
import { Link } from 'react-router-dom'

const popularProducts = [
	{
		id: '3432',
		product_name: 'Bánh bột lọc',
		product_thumbnail: 'https://bepnhamo.vn/wp-content/uploads/2023/02/maxresdefault.jpg',
		product_price: '₫50000',
		product_stock: 341
	},
	{
		id: '7633',
		product_name: 'Bánh bột lọc',
		product_thumbnail: 'https://bepnhamo.vn/wp-content/uploads/2023/02/maxresdefault.jpg',
		product_price: '₫70000',
		product_stock: 24
	},
	{
		id: '6534',
		product_name: 'Bánh bột lọc',
		product_thumbnail: 'https://bepnhamo.vn/wp-content/uploads/2023/02/maxresdefault.jpg',
		product_price: '₫25000',
		product_stock: 56
	},
	{
		id: '9234',
		product_name: 'Bánh bột lọc',
		product_thumbnail: 'https://bepnhamo.vn/wp-content/uploads/2023/02/maxresdefault.jpg',
		product_price: '₫60000',
		product_stock: 98
	},
	{
		id: '4314',
		product_name: 'Bánh bột lọc',
		product_thumbnail: 'https://bepnhamo.vn/wp-content/uploads/2023/02/maxresdefault.jpg',
		product_price: '₫20000',
		product_stock: 0
	},
	{
		id: '4342',
		product_name: 'Bánh bột lọc',
		product_thumbnail: 'https://bepnhamo.vn/wp-content/uploads/2023/02/maxresdefault.jpg',
		product_price: '₫80000',
		product_stock: 453
	}
];


function PopularProduct() {
	return (
		<div className="w-[20rem] bg-[#282941] p-4 rounded-sm">
			<strong className="text-white font-medium">Sản phẩm bán chạy</strong>
			<div className="mt-4 flex flex-col gap-3">
				{popularProducts.map((product) => (
					<Link
						key={product.id}
						to={`product/productdetail/${product.id}`}
						className="flex items-start hover:no-underline"
					>
						<div className="w-10 h-10 min-w-[2.5rem] bg-gray-200 rounded-sm">
							<img
								className="w-full h-full object-cover rounded-sm"
								src={product.product_thumbnail}
								alt={product.product_name}
							/>
						</div>
						<div className="ml-4 flex-1">
							<p className="text-sm text-white">{product.product_name}</p>
							<span
								className={classNames(
									product.product_stock === 0
										? 'text-red-500'
										: product.product_stock > 50
										? 'text-green-500'
										: 'text-amber-300',
									'text-xs font-medium'
								)}
							>
								Còn: {product.product_stock === 0 ? 'Hết hàng' : product.product_stock}
							</span>
						</div>
						<div className="text-xs text-white pl-1.5">{product.product_price}</div>
					</Link>
				))}
			</div>
		</div>
	)
}

export default PopularProduct