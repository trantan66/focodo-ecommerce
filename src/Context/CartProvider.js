import { createContext, useEffect, useState } from 'react';
import { getNumberOfCart } from '../Services/CartService';
const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [numberOfCart, setNumberOfCart] = useState(0);
    const fetchNumberOfCart = async () => {
        try {
            const result = await getNumberOfCart();
            setNumberOfCart(result);
        } catch (error) {
            console.error('Error fetching number of cart:', error);
        }
    };
    const updateNumberOfCart = (newCount) => {
        setNumberOfCart(newCount);
    };
    useEffect(() => {
        fetchNumberOfCart();
    }, []);
    return (
        <CartContext.Provider value={{ numberOfCart, updateNumberOfCart, fetchNumberOfCart }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartContext;
