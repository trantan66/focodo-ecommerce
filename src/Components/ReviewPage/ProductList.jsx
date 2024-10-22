import React from 'react';

function ProductList(props) {
    return (
        <div className="flex gap-3 my-2">
            <img src={props.img} alt="" className="w-[5%] h-[50px]" />
            <span className="">{props.name}</span>
        </div>
    );
}

export default ProductList;
