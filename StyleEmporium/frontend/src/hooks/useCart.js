import React, { useEffect, useState } from 'react'
function useCart() {

    const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);

    useEffect(() => {
        // Verificar se há um carrinho no localStorage e defina-o como estado inicial
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            setCart(JSON.parse(savedCart));
        }
    }, []);

    useEffect(() => {
        //Salvar o carrinho no localStorage sempre que ele for atualizado 
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const AddToCart = (produtoId) => {
        setCart((prevCart) => {
            const updateCart = [...prevCart, produtoId];
            localStorage.setItem('cart', JSON.stringify(updateCart));
            return updateCart;
        });
    };

    const removeCart = (produtoId) => {
        setCart((prevCart) => {
            const indexToRemove = prevCart.indexOf(produtoId);
            if (indexToRemove === -1) return prevCart; //não encontra o produto

            const updateCart = [...prevCart];
            updateCart.splice(indexToRemove, 1);
            localStorage.setItem('cart', JSON.stringify(updateCart));
            return updateCart;
        });
    };
    return { cart, AddToCart, removeCart };
}

export default useCart;