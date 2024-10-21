const products = [
    {
        id: 1,
        Name: 'Bánh bèo Huế',
        Quantity: 1,
        TotalPrice: 15000,
        image: 'https://res.cloudinary.com/dpsqln4rh/image/upload/v1726502831/focodo_ecommerce/product/yjojahq8kmzk5nb7c6ta.jpg',
    },
    {
        id: 2,
        Name: 'Bánh bèo Huế',
        Quantity: 2,
        TotalPrice: 30000,
        image: 'https://res.cloudinary.com/dpsqln4rh/image/upload/v1726502831/focodo_ecommerce/product/yjojahq8kmzk5nb7c6ta.jpg',
    },
    {
        id: 3,
        Name: 'Bánh bèo Huế',
        Quantity: 1,
        TotalPrice: 15000,
        image: 'https://res.cloudinary.com/dpsqln4rh/image/upload/v1726502831/focodo_ecommerce/product/yjojahq8kmzk5nb7c6ta.jpg',
    },
];

const TotalOrderPrice = 60000;
const TotalShippingFee = 20000;
const discount = 10000;

export default { products, TotalOrderPrice, TotalShippingFee, discount };
