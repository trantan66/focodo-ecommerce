import { useEffect, useState } from 'react';
import comhen from '../image/comhen.jpg';
import { getCategoriesByOptions } from '../../../Services/CategoryService';
function Category() {
    const options = ['Bánh Huế', 'Mè xửng', 'Hạt sen Huế', 'Mắm Cô Ri'];
    const [categories, setCategories] = useState();
    const fetchCategories = async () => {
        const response = await getCategoriesByOptions(options);
        setCategories(response.result);
    };

    useEffect(() => {
        fetchCategories();
    }, []);
    return (
        <>
            {categories && (
                <div className="grid grid-cols-4 grid-rows-1 grid-flow-col w-full mt-[50px] mb-[30px] gap-2">
                    {categories.map((category) => (
                        <div key={category.id} className="">
                            <div>
                                <img src={category.image} className="w-full h-[300px] object-cover" />
                            </div>
                            <p className="italic text-3xl font-normal text-left ml-[35px] mt-[20px]">{category.name}</p>
                            <p className="italic text-gray-500 ml-[35px] mr-[35px] mt-[20px] line-clamp-4">
                                {category.description}
                            </p>
                            <div className="flex items-center ml-[35px] mt-[20px]">
                                <a
                                    href={`/product/${category.id}`}
                                    className="inline-block font-semibold text-[14px] px-[25px] py-[8px] rounded-[8px] text-black bg-[#ffffffeb] border-[1px] border-black hover:no-underline hover:text-white hover:bg-black"
                                >
                                    Mua ngay
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}

export default Category;
