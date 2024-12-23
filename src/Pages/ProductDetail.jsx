import React from 'react';
import ProductMainDetail from '../Components/ProductDetail/ProductMainDetail';
import ReviewDisplay from '../Components/ProductDetail/ReviewDisplay';
import ReviewList from '../Components/ProductDetail/ReviewList';
import RelatedProductList from '../Components/ProductDetail/RelatedProductList';

function ProductDetail() {
    return (
        <div className="p-4 w-[1200px] mx-auto">
            <ProductMainDetail />
            <div className="mb-[4rem]">
                <ReviewList />
            </div>
            <ReviewDisplay />
            <RelatedProductList />
        </div>
    );
}

export default ProductDetail;
