import React, { useState, useEffect, useContext } from 'react';
import api from '../../utils/api';
import { Context } from '../../context/UserContext';
import { Link } from "react-router-dom";
import estilo from './css/home.module.css';

function Home() {
  const [Produtos, setProdutos] = useState([]);
  const [token] = useState(localStorage.getItem('token') || '')
  const [produto, setProduto] = useState([]);
  const { authenticated } = useContext(Context)


  useEffect(() => {
    api.get('/produtos/getall').then((response) => {
      setProdutos(response.data.Produtos);
    });
  }, []);

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



  return (
    <section>
      <div className="heading_container heading_center">
        <h2 style={{ marginTop: '20px' }}>Produtos</h2>
      </div>
      {Produtos.length > 0 ? (
        <div className={`${estilo.grid}`}>
          {Produtos.map((Produto) => (
            <Link to={`/produto/${Produto.id}`} key={Produto.id}>
              <div className={`${estilo.container}`}>
                <div className={`${estilo.card}`}>
                  <div className={`${estilo.imgBx}`}>
                    <img
                      src={`http://localhost:5000/images/${Produto.ProdutoImagems[0]?.image}`}
                      alt=""
                    />
                  </div>
                  <div className={`${estilo.contentBx}`}>
                    <h2>{Produto.name}</h2>
                    <div className={`${estilo.size}`}>
                      <h3>Tamanhos :</h3>
                      {Produto.Tamanhos ? (
                        Produto.Tamanhos.map((tamanho, index) => (
                          <span key={index}>{tamanho.Tamanho}</span>
                        ))
                      ) : (
                        <p>Nenhum tamanho disponível.</p>
                      )}
                    </div>
                    <div className={`${estilo.color}`}>
                      <h3>Cor :</h3>
                      {Produto.Cors ? (
                        Produto.Cors.map((cor, index) => (
                          <div key={index}>
                            <p
                              style={{
                                backgroundColor: cor.Cor,
                                width: '25px',
                                height: '25px',
                                borderRadius: '25px'
                              }}
                            ></p>
                            
                          </div>
                        ))
                      ) : (
                        <p>Nenhuma cor disponível.</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p style={{ textAlign: 'center' }}>Não há produtos cadastrados ou disponíveis para compra no momento!</p>
      )}
    </section>
  );
}

export default Home;
