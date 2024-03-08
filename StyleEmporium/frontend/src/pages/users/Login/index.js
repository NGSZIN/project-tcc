import React, { useContext, useState } from 'react';
import InputGroup from '../../../components/InputGroup';
import { Link } from 'react-router-dom';
import { Context } from '../../../context/UserContext'; // Importe useUser corretamente
import estilo from './Login.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Login() {
  const [user, setUser] = useState({});
  const { login } = useContext(Context); // Use useUser para acessar o contexto

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    login(user);
  }

  return (
    <body>
      <div className={`${estilo.section}`}>
        <div className={`${estilo.container}`}>
          <form
            onSubmit={handleSubmit}
            name="form1"
            className={`${estilo.box}`}
            method="post"
          >
            <h2 className={`${estilo.login}`}>Login</h2>
            <h5 className={`${estilo.conta}`}>Entre na sua conta</h5>
            <InputGroup
              type="email"
              name="email"
              className={`${estilo.input}`}
              placeholder="Digite seu email"
              handleChange={handleChange}
            />
            <InputGroup
              type="password"
              name="password"
              className={`${estilo.input}`}
              placeholder="Digite sua senha"
              handleChange={handleChange}
            />
            <button className={`${estilo.btn1}`} to='/' type="submit">
              Login
            </button>
            <p className={`${estilo.semConta}`}>
              Não tem uma conta? <Link className={`${estilo.cliqueAqui}`} to='/register'>Clique aqui
              </Link>
            </p>
          </form>
        </div>
      </div>
    </body>
  );
}

export default Login;
