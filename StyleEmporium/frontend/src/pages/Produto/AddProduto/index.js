import React, { useState } from 'react';
import InputGroup from '../../../components/InputGroup';
import api from '../../../utils/api';
import estilo from './addproduto.module.css';


function AddProduto() {
    const [Produto, setProduto] = useState({});
    const [preview, setPreview] = useState();
    const [token] = useState(localStorage.getItem('token') || '');
    const [image, setImage] = useState(null);

    function handleChange(e) {
        setProduto({ ...Produto, [e.target.name]: e.target.value });
    }

    function onFileChange(e) {
        const file = e.target.files[0];

        if (file) {
            setPreview(URL.createObjectURL(file));
            setImage(file);
        } else {
            setPreview(null);
            setImage(null);
        }
    }


    async function handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData();

        if (image) {
            formData.append('image', image);
        }

        // Montando objeto com o formulário
        for (const key in Produto) {
            formData.append(key, Produto[key]);
        }

        try {
            const response = await api.post(`/produtos/create`, formData, {
                headers: {
                    Authorization: `Bearer ${JSON.parse(token)}`,
                    // Não é necessário definir o 'Content-Type' como 'application/json' aqui
                },
            });
            alert(response.data.message);
        } catch (err) {
            alert(err.response.data);
        }
    }


    return (
        <div>
            <h3>Cadastre um produto para compra</h3>
            <div className={`${estilo.container}`}>
                <form onSubmit={handleSubmit}>
                    <input
                        type="file"
                        label="Coloque a foto do produto"
                        name="image"
                        className={`${estilo.input}`}
                        onChange={onFileChange}
                    />
                    <InputGroup
                        type="text"
                        label="Digite o nome do produto"
                        name="name"
                        placeholder="Digite o nome do produto"
                        handleChange={handleChange}
                        className={`${estilo.input}`}
                    />
                    <InputGroup
                        type="text"
                        label="Digite a descrição do produto"
                        name="descricao"
                        placeholder="Digite a descrição do produto"
                        handleChange={handleChange}
                        className={`${estilo.input}`}
                    />
                    <InputGroup
                        type="text"
                        label="Digite a categoria do produto"
                        name="categoria"
                        placeholder="Digite a categoria do produto"
                        handleChange={handleChange}
                        className={`${estilo.input}`}
                    />
                    <InputGroup
                        type="color"
                        label="Digite a cor do produto"
                        name="cor"
                        placeholder="Digite a cor"
                        handleChange={handleChange}
                        className={`${estilo.input}`}
                    />
                    <InputGroup
                        type="text"
                        label="Digite a marca do produto"
                        name="marca"
                        placeholder="Digite a marca do produto"
                        handleChange={handleChange}
                        className={`${estilo.input}`}
                    />
                    <InputGroup
                        type="text"
                        label="Digite o tamanho do produto"
                        name="tamanho"
                        placeholder="Digite o tamanho do produto"
                        handleChange={handleChange}
                        className={`${estilo.input}`}
                    />
                    <InputGroup
                        type="text"
                        label="Informe o preço do produto"
                        name="preco"
                        placeholder="Digite o preço do produto"
                        handleChange={handleChange}
                        className={`${estilo.input}`}
                    />
                    <InputGroup
                        type="number"
                        label="Informe a quantidade disponível do produto"
                        name="quantidade"
                        placeholder="Digite a quantidade disponível do produto"
                        handleChange={handleChange}
                        className={`${estilo.input}`}
                    />
                    <InputGroup
                        type="number"
                        label="Informe o codigo do produto"
                        name="codigo"
                        placeholder="Digite o código do produto"
                        handleChange={handleChange}
                        className={`${estilo.input}`}
                    />
                    <div className={`${estilo.btn}`}>
                        <button type="submit" className={`${estilo.btn1}`}>
                            Cadastrar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default AddProduto;
