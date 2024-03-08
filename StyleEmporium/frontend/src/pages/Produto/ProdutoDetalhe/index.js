// ProdutoDetalhe.js
import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../../../context/UserContext';
import { useParams } from 'react-router-dom';
// import InputGroup from '../../../components/InputGroup';
import api from '../../../utils/api';
import estilo from './product.module.css';
import useCart from '../../../hooks/useCart'


function ProdutoDetalhe() {
    const [produto, setProduto] = useState([]);
    const { id } = useParams();

    const { cart, AddToCart, removeCart } = useCart();
    const { authenticated } = useContext(Context)
    const [token] = useState(localStorage.getItem('token') || '')
    const [user, setUser] = useState({})

    useEffect(() => {
        if (!token) {
            return
        } else {
            api.get('/users/checkuser', {
                headers: {
                    Authorization: `Bearer ${JSON.parse(token)}`
                }
            }).then((response) => {
                setUser(response.data)
            })
        }
    }, [])

    async function removeProducts(id) {
        try {
            const data = await api.delete(`/produtos/${id}`, {
                headers: {
                    Authorization: `Bearer ${JSON.parse(token)}`
                }
            });
            const updateProdutos = produto.filter((produto) => produto.id !== id);
            setProduto(updateProdutos);
            alert(data.message);
        } catch (err) {
            console.error(err);
            alert('Produto removido com sucesso');
        }
    }

    useEffect(() => {
        api.get(`/produtos/${id}`).then((response) => {
            setProduto(response.data.produto);
        });
    }, [id]);




    return (
        <main className={`${estilo.container}`}>

            {/* Div Da imagem */}
            <div className={`${estilo.leftcolumn}`}>
                <img
                    src={`http://localhost:5000/images/${produto.ProdutoImagems?.[0]?.image ?? ''}`}
                    style={{ width: '500px' }}
                />
            </div>

            {/* Div da categoria */}
            <div className={`${estilo.rightcolumn}`}>
                <div className={`${estilo.productdescription}`}>
                    {produto.Categoria ? (
                        produto.Categoria.map((categoria, index) => (
                            <div key={index}>
                                <span>{categoria.categoria}</span>
                            </div>
                        ))
                    ) : (
                        <p>Nenhuma tamanho disponível.</p>
                    )}
                    <h1>{produto.name}</h1>
                    <span>{produto.marca}</span>
                    <span>{produto.categoria}</span>
                    <p>{produto.descricao}</p>
                </div>

                <div className={`${estilo.productconfiguration}`}>
                    <div className={`${estilo.productcolor}`}>
                        <span>Color:</span>

                        <div className={`${estilo.colorchoose}`}>
                            {produto.Cors ? (
                                produto.Cors.map((cor, index) => (
                                    <div key={index}>
                                        <button style={{ backgroundColor: cor.Cor }} className={`${estilo.cor}`}></button>

                                    </div>
                                ))
                            ) : (
                                <p>Nenhuma cor disponível.</p>
                            )}
                        </div>
                    </div>

                    <div className={`${estilo.cableconfig}`}>
                        <span>Tamanhos:</span>
                        <div className={`${estilo.cablechoose}`}>
                            {produto.Tamanhos ? (
                                produto.Tamanhos.map((tamanho, index) => (
                                    <div key={index}>
                                        <button className={`${estilo.tamanho}`}>{tamanho.Tamanho}</button>
                                        <button className={`${estilo.tamanho}`}>{tamanho.Tamanho}</button>
                                        <button className={`${estilo.tamanho}`}>{tamanho.Tamanho}</button>
                                    </div>
                                ))
                            ) : (
                                <p>Nenhuma tamanho disponível.</p>
                            )}
                        </div>
                    </div>
                </div>

                <div className={`${estilo.productPrice}`}>
                    <span>R${produto.preco}</span>
                    <button className={`${estilo.buttonPrice}`} onClick={() => AddToCart(produto.id)} style={{ cursor: 'pointer' }}>Adicionar ao carrinho</button>
                </div>

                {authenticated ? (

                    user.admin !== 0 ? (
                        <>
                          <Link style={{ margin: '10px', color: 'black' }} to={`/produto/edit/${produto.id}`}><i class='bx bxs-edit-alt'></i></Link>
                            <i className='bx bx-trash' style={{ color: 'black', border: 'none', cursor: 'pointer', paddingTop: '6px' }} onClick={() => { removeProducts(produto.id) }}></i>
                        </>
                    ) : (null)
                ) : (null)}
            </div>
        </main>

    )
}

export default ProdutoDetalhe