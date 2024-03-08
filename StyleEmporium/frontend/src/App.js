import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/users/Register';
import Login from './pages/users/Login';
import Profile from './pages/users/Profile';
import NavBar from './components/NavBar';
import { UserProvider } from './context/UserContext'; // Renomeie para UserContext
import Container from './components/Container';
import AddProduto from './pages/Produto/AddProduto';
import ProdutoDetalhe from './pages/Produto/ProdutoDetalhe';
import Carrinho from './pages/Carrinho'
import EditProdutos from './pages/Produto/EditProduto';


function App() {
  return (
    <div className="App">
      <Router>
        <UserProvider>
            <NavBar />
            <Container>
              <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/register" element={<Register />} />
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/user/profile" element={<Profile />} />
                <Route exact path="/Produto/create" element={<AddProduto />} />
                <Route exact path="/produto/:id" element={<ProdutoDetalhe />} />
                <Route path="/produto/edit/:id" element={<EditProdutos />} />
                <Route path="/cart" element={<Carrinho />} />
              </Routes>
            </Container>
        </UserProvider>
      </Router>
    </div>
  );
}

export default App;
