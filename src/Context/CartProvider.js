import { createContext, useEffect, useState } from 'react';
import { getNumberOfCart, fetchCartOfUser } from '../Services/CartService';
const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [numberOfCart, setNumberOfCart] = useState(0);
    const [carts, setCarts] = useState([]);
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

    const fetchCart = async () => {
        try {
            const cartItems = await fetchCartOfUser();
            setCarts(cartItems);
        } catch (error) {
            console.error('Error fetching cart:', error);
        }
    };

    useEffect(() => {
        fetchNumberOfCart();
        fetchCart();
    }, []);
    return (
        <CartContext.Provider
            value={{ numberOfCart, carts, setCarts, fetchCart, updateNumberOfCart, fetchNumberOfCart }}
        >
            {children}
        </CartContext.Provider>
    );
};

export default CartContext;
