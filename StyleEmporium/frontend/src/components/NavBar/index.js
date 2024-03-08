import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from '../../utils/api';
import estilo from './css/navbar.module.css'
import ImagemLogo from './img/LogoLeao.png'
import ImagemNome from './img/LogoNome.png'
import { Cart } from 'react-bootstrap-icons'
import { Person } from 'react-bootstrap-icons'
import { House } from 'react-bootstrap-icons'
import { DoorOpen } from 'react-bootstrap-icons'
import { PlusCircle } from 'react-bootstrap-icons'
import { Context } from '../../context/UserContext';

function NavBar() {
  const { authenticated, logout } = useContext(Context)
  const [user, setUser] = useState({});

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      api.get('/users/checkuser', {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`
        }
      }).then((response) => {
        setUser(response.data)
      })
    }
  }, []);

  return (
    <nav className={`${estilo.nav}`}>
      <div className={`${estilo.container}`}>
        <div className={`${estilo.logos}`}>
          <a href="/">
            <img
              src={ImagemLogo}
              alt="Logo"
              style={{ width: '90px' }}
              className={`${estilo.logo}`}
            />
          </a>


          <img
            src={ImagemNome}
            alt="Nome"
            style={{ width: '120px' }}
            className={`${estilo.logo}`}
          />

        </div>
        <div>
          <ul className={`${estilo.navlinks}`}>

            <li className={`${estilo.li}`}>
              <Link to='/'>
                <House />
              </Link>
            </li>
            
            {!authenticated ? (
              <>
                <li className={`${estilo.li}`}>
                  <Link to='/register'>Registrar</Link>
                </li>
                <li className={`${estilo.li}`}>
                  <Link to='/login'>Login</Link>
                </li>
              </>
            ) : (
              <>
                <li className={`${estilo.li}`}>
                  <Link to='/user/profile'>
                    <Person />
                  </Link>
                </li>

                <li className={`${estilo.li}`}>
                  <Link to="/cart">
                    <Cart />
                  </Link>
                </li>

                <li className={`${estilo.li}`}>
                  {user.admin !== 0 ? (
                    <Link to='/Produto/create'>
                      <PlusCircle />
                    </Link>
                  ) : (
                    <li style={{ color: '#EFBB40', marginRight: '50%', marginLeft: '50%', margin: '0', padding: '0' }}>
                      |
                    </li>
                  )}

                </li>
                <li onClick={logout} className={`${estilo.li}`}>
                  <Link to='/'>
                    <DoorOpen />
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default NavBar




