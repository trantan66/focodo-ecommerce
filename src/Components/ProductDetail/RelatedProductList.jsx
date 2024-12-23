import React, { useEffect, useState } from 'react';
import { getRelatedProducts } from '../../Services/ProductService';
import { useParams } from 'react-router-dom';
import Slider from 'react-slick';
import rightArrow from '../../Components/Shared/image/right-arrow.png';
import leftArrow from '../../Components/Shared/image/left-arrow.png';
import ProductCard from '../Shared/ProductCard';
const RelatedProductList = () => {
    function SampleNextArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{
                    ...style,
                    display: 'block',
                    backgroundImage: `url(${rightArrow})`,
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    width: '25px',
                    height: '25px',
                }}
                onClick={onClick}
            />
        );
    }

    function SamplePrevArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{
                    ...style,
                    display: 'block',
                    backgroundImage: `url(${leftArrow})`,
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    width: '25px',
                    height: '25px',
                }}
                onClick={onClick}
            />
        );
    }

    const responsive = [
        {
            breakpoint: 1200,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 4,
                infinite: true,
                dots: true,
            },
        },
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: true,
            },
        },
        {
            breakpoint: 764,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                infinite: true,
                dots: true,
            },
        },
    ];

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive,
    };

    const { id } = useParams();
    const [relatedProducts, setRelatedProducts] = useState([]);
    useEffect(() => {
        fetchRelatedProducts();
    }, [id]);

    const fetchRelatedProducts = async () => {
        const response = await getRelatedProducts(id);
        setRelatedProducts(response);
    };
    return (
        <div>
            {relatedProducts.length > 0 && (
                <div className="mt-[30px]">
                    <div className="text-[28px] mb-[30px] font-semibold flex items-center justify-center ">
                        Sản phẩm liên quan
                    </div>

                    <div>
                        <Slider {...settings}>
                            {relatedProducts.map((product) => (
                                <div key={product.id}>
                                    <ProductCard product={product} />
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RelatedProductList;
