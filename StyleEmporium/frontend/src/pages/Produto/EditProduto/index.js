import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import api from '../../../utils/api';
import estilo from '../AddProduto/addproduto.module.css'
import InputGroup from '../../../components/InputGroup';

function EditProdutos() {
  
  const [Produto, setProduto] = useState([]);

    const { id } = useParams()
    
    const [token] = useState(localStorage.getItem('token')  || '')

    function handleChange(e) {
        setProduto({...Produto, [e.target.name]: e.target.value})
    }

    const [images, setImage] = useState(null)
    function onFileChange(e) {
 
            setImage(e.target.files[0])
        }
        
          async function handleSubmit(e) {
            e.preventDefault()
        
            const formData = new FormData()
        
            if (images) {
              formData.append('images', images)
            }

    await Object.keys(Produto).forEach((key) => formData.append(key, Produto[key]))

    const data = await api.patch(`/produtos/${id}`, formData, {
      
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
        'Content-Type': 'multipart/form-data'
      }
    }).then((response) => {
      return response.data
    }).catch((err) => {
      alert(err.response.data)
      return err.response.data
    })
    alert(data.message)
  }
  return (
    <div>
    <h3>Editar Sessão Produtos</h3>
    <div className={`${estilo.container}`}>
         
            <form onSubmit={handleSubmit}>
                <InputGroup
                    type='file'
                    label='Selecione a imagem correta'
                    name='images'
                    handleChange={onFileChange}
                    className={`${estilo.input}`}
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
            
            <div  className={`${estilo.btn}`}><button className={`${estilo.btn1}`} type='submit'>Editar</button> </div> 
            </form>
    </div>
    </div>
  )
}

export default EditProdutos