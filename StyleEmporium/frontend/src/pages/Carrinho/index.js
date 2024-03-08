import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import useCart from '../../hooks/useCart'
import './cart.scss'
import PageTitle from './PageTitle';

function Carrinho() {
    // variável de estado para rastrear se o carrinho está vazio ou não
    const [carrinhoVazio, setCarrinhoVazio] = useState(true);

    const [Produtos, setProdutos] = useState([]);

    const [cartItems, setCartItems] = useState([]);
    const { cart, AddToCart, removeCart } = useCart();
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        api.get('/produtos/getall').then((response) => {
            setProdutos(response.data.Produtos.map(item => ({ ...item, type: 'produto' })));
        });
    }, []);

    useEffect(() => {
        if (cartItems) {
            const mergedItems = [...Produtos];

            const filteredItems = mergedItems
                .filter((item) => cart.includes(item.id))
                .map((item) => {
                    const quantity = cart.filter((id) => id === item.id).length;
                    return { ...item, quantity };
                });

            setCartItems(filteredItems);

            // Verifique se o carrinho está vazio e atualize carrinhoVazio em conformidade
            setCarrinhoVazio(filteredItems.length === 0);

            // Calculando o valor total:
            const total = filteredItems.reduce(
                (acc, currItem) => acc + currItem.preco * currItem.quantity,
                0
            );
            setTotalPrice(total);
        }
    }, [cart, Produtos]);


    return (
        <>
            <main>
                <PageTitle title={'Seu Carrinho'} />
                <div className='content-cart'>
                    <section>
                        <table>
                            <thead>
                                {cartItems.length > 0 ? (
                                    <tr>
                                        {/* <th>ID</th> */}
                                        <th>Produto</th>
                                        <th>Preço</th>
                                        <th>Quantidade</th>
                                        <th>Total</th>
                                        <th>-</th>
                                    </tr>
                                ) : (
                                    <tr>
                                        <th colSpan="5" style={{ paddingLeft: '55%' }}>O carrinho está vazio.</th>
                                    </tr>
                                )}
                            </thead>
                            <tbody>
                                {cartItems.map((item) => (
                                    <tr key={item.id}>
                                        <td>
                                            <div className="produtos">
                                                {/* <img src="https://picsum.photos/100/120" alt="" /> */}
                                                <div className="info">
                                                    <div className="name">{item.name}</div>
                                                    <div className="category">Categoria</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>R$ {item.preco}</td>
                                        <td>
                                            <div className="qty">
                                                <button
                                                    onClick={() => {
                                                        if (item.quantity > 1) {
                                                            removeCart(item.id);
                                                        }
                                                    }}
                                                >
                                                    <i className="bx bx-minus"></i>
                                                </button>
                                                {item.quantity}
                                                <button onClick={() => AddToCart(item.id)}>
                                                    <i className="bx bx-plus"></i>
                                                </button>
                                            </div>
                                        </td>
                                        <td>R$ {(item.quantity * item.preco).toFixed(3)} </td>
                                        <td>
                                            <button className="remove" onClick={() => removeCart(item.id)}>
                                                <i className="bx bx-x"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </section>

                    <aside>
                        <div style={{ marginTop: '-174px'}} className="box-cart">
                            <header>Resumo da compra</header>
                            <div className="info">
                                <div>
                                    <span>Sub-total</span>
                                    <span>
                                        R${' '}
                                        {/* calcula o subtotal dos itens no carrinho, arredondando o resultado para três casas decimais após o ponto decimal. 
          No entanto, se o carrinho estiver vazio, ele retornará "0" como valor padrão. */}
                                        {cartItems.length > 0 ? cartItems.reduce((total, item) => total + item.quantity * item.preco, 0).toFixed(3) : '0'}
                                    </span>
                                </div>
                                <div>
                                    <span>Frete</span>
                                    <span>Gratuito</span>
                                </div>
                                <div>
                                    <button style={{ color: 'green' }}>
                                        Adicionar cupom de desconto
                                        <i className="bx bx-right-arrow-alt"></i>
                                    </button>
                                </div>
                            </div>
                            <footer>
                                <span>Total</span>
                                <span>
                                    R${' '}
                                    {/* calcula o subtotal dos itens no carrinho, arredondando o resultado para três casas decimais após o ponto decimal. 
          No entanto, se o carrinho estiver vazio, ele retornará "0" como valor padrão. */}
                                    {cartItems.length > 0 ? cartItems.reduce((total, item) => total + item.quantity * item.preco, 0).toFixed(3) : '0'}
                                </span>
                            </footer>
                        </div>
                        <button style={{ background: '#EFBB40' }}>Continuar Compra</button>
                    </aside>
                </div>
            </main>
        </>
    )
}



export default Carrinho;