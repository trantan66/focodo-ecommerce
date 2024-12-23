import { useEffect, useState } from 'react';
import { Tabs } from 'antd';
import ProductCard from '../../Shared/ProductCard';
import { getProductsFromCategory } from '../../../Services/ProductService';
function ListProduct() {
    const [category, setCategory] = useState(2);
    const [products, setProducts] = useState([]);
    const items = [
        {
            key: '2',
            label: 'Bán chạy',
        },
        {
            key: '8',
            label: 'Khuyến mãi',
        },
    ];

    useEffect(() => {
        fetchProducts();
    }, [category]);

    const fetchProducts = async () => {
        const response = await getProductsFromCategory(category, 0, 8);
        setProducts(response.result.data);
    };
    const onChange = (key) => {
        setCategory(key);
    };

    return (
        <>
            <div className="mt-[100px] mb-[20px] flex justify-center items-center">
                <div className="w-[1200px] h-[40px]">
                    <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
                </div>
            </div>

            {products.length !== 0 && (
                <div>
                    <div className="w-full h-auto flex justify-center items-center">
                        <div className="grid grid-cols-4 gap-4 w-[1200px]">
                            {products.map((product) => (
                                <div key={product.id}>
                                    <ProductCard product={product} />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex items-center justify-center mt-[30px]">
                        <a
                            href={`/product/${category}`}
                            className="inline-block font-semibold text-[16px] px-[30px] py-[10px] rounded-[8px] text-black bg-[#ffffffeb] border-[1px] border-black hover:no-underline hover:text-white hover:bg-black"
                        >
                            Xem thêm
                        </a>
                    </div>
                </div>
            )}
        </>
    );
}

export default ListProduct;
