import React, { useContext, useState } from 'react';
import InputGroup from '../../../components/InputGroup';
import { Link } from 'react-router-dom';
import { Context } from '../../.././context/UserContext'; // Importe useUser corretamente
import estilo from './register.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Register() {
  const [user, setUser] = useState({});
  const { register } = useContext(Context); // Use useUser para acessar o contexto

  function handleChange(evento) {
    setUser({ ...user, [evento.target.name]: evento.target.value });
  }

  function handleSubmit(evento) {
    evento.preventDefault();
    register(user);
  }

  return (
    <div className={`${estilo.section}`}>
      <div className={`${estilo.container}`}>
        <form
          onSubmit={handleSubmit}
          name="form1"
          className={`${estilo.box}`}
          method="post"
        >
          <h2 className={`${estilo.login}`}>Registrar</h2>
          <h5 className={`${estilo.conta}`}>Crie sua conta</h5>
          <InputGroup
            type='text'
            placeholder='Seu nome aqui'
            name='name'
            className={`${estilo.input}`}
            handleChange={handleChange}
          />
          <InputGroup
            type='email'
            placeholder='Seu email aqui'
            name='email'
            className={`${estilo.input}`}
            handleChange={handleChange}
          />
          <InputGroup
            type='tel'
            placeholder='Seu telefone aqui'
            name='phone'
            className={`${estilo.input}`}
            handleChange={handleChange}
          />
          <InputGroup
            type='password'
            placeholder='Digite sua senha'
            name='password'
            className={`${estilo.input}`}
            handleChange={handleChange}
          />
          <InputGroup
            type='password'
            placeholder='Confirme sua senha'
            name='confirmpassword'
            className={`${estilo.input}`}
            handleChange={handleChange}
          />
          <button className={`${estilo.btn1}`} to='/' type='submit'>Registrar</button>
          <p className={`${estilo.semConta}`}>
            Já tem uma conta? <Link className={`${estilo.cliqueAqui}`} to='/login'>Clique aqui</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
