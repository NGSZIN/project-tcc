import React, { useState, useEffect } from 'react'
import api from '../../../utils/api'
import { useNavigate } from 'react-router-dom'
import InputGroup from '../../../components/InputGroup'
import estilo from './profile.module.css'

function Profile() {
  //Aqui vamos digitar a logica do perfil
  const [user, setUser] = useState({})
  const [preview, setPreview] = useState()
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const navigate = useNavigate()

  useEffect(() => {
    if (!token) {
      alert('Por favor faça o login')
      navigate('/login')
    } else {
      api.get('/users/checkuser', {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`
        }
      }).then((response) => {
        setUser(response.data)
      })
    }
  }, [token, navigate])



  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  //trabalhando com a imagem
  const [image, setImage] = useState(null)

  function onFileChange(e) {
    setPreview(URL.createObjectURL(e.target.files[0]))
    setImage(e.target.files[0])
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();

    // Adiciona a imagem ao formData (se ela existir)
    if (image) {
      formData.append('image', image);
    }

    // Adiciona as outras propriedades do usuário ao FormData
    for (const key of Object.keys(user)) {
      formData.append(key, user[key]);
    }

    try {
      const response = await api.patch(`/users/edit/${user.id}`, formData, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      const data = response.data;
      alert(data.message);
    } catch (err) {
      alert(err.response.data.message);
    }
  }


  return (
    <div className={`${estilo.container}`}>
      <div className='w-100'>
        <h2>Perfil</h2>
        <div className={`${estilo.formulario}`}>
          <form onSubmit={handleSubmit} className={`w-75`} >
            <label htmlFor='imgPerfil' className={`w-100 ${estilo.fundo_imagem}`}>
              <img
                style={{ height: '200px', width: '200px', cursor: 'pointer' }}
                className={`${estilo.imgPerfil} bg-black`}
                src={
                  user.image
                    ? 'http://localhost:5000/images/users/' + user.image
                    : 'https://thumbs.dreamstime.com/b/perfil-de-usu%C3%A1rio-do-vetor-avatar-padr%C3%A3o-179376714.jpg'
                }
              />
            </label>
            <input
              id='imgPerfil'
              type='file'
              name='image'
              onChange={onFileChange}
              className='d-none'
            />
            <InputGroup
              type='text'
              label='Nome'
              name='name'
              className='form-control mt-2 m-2'
              placeholder='Digite seu nome'
              handleChange={handleChange}
              value={user.name}
            />
            <InputGroup
              type='email'
              label='email'
              name='email'
              className='form-control mt-2 m-2'
              placeholder='Digite seu email'
              handleChange={handleChange}
              value={user.email}
            />
            <InputGroup
              type='phone'
              label='phone'
              name='phone'
              className='form-control mt-2 m-2'
              placeholder='Digite seu phone'
              handleChange={handleChange}
              value={user.phone}
            />
            <InputGroup
              type='password'
              label='Senha'
              name='password'
              className='form-control mt-3 m-2'
              placeholder='Digite sua senha'
              handleChange={handleChange}
            />
            <InputGroup
              type='password'
              label='Confirme sua senha'
              name='confirmpassword'
              className='form-control mt-3 m-2'
              placeholder='Confirme sua senha'
              handleChange={handleChange}
            />
            <div className={`${estilo.btn} mt-3`}>
              <button type='submit' className={`${estilo.btn1}`}>Atualizar</button>
            </div>
          </form >
        </div>
      </div>
    </div>
  )
}

export default Profile
