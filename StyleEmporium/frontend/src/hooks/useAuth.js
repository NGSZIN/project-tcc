import api from '../utils/api'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
// import {NotificationContainer, NotificationManager} from 'react-notifications'

function useAuth() {
    //useState() é um hook para alterar o estado de algo
    const [authenticated, setAuthenticated] = useState(false)
    //useNavigate() é utilizado para redirecionar o usuario para uma rota 
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('token')
    
        if (token) {
            try {
                api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`
                setAuthenticated(true)
            } catch (error) {
                console.error('Erro ao analisar o token:', error)
            }
        }
    }, [])
    
    async function authUser(data) {
        setAuthenticated(true)
        localStorage.setItem('token', JSON.stringify(data.token))
        navigate('/')
    }

    async function register(user) {
        try {
            const data = await api.post('/users/register', user)
                .then((response) => {
                    return response.data
                })
            alert(data.message)
            await authUser(data)
        } catch (error) {
            console.log('Erro ao cadastrar ', error)
            alert(error.response.data.message)
        }
    }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          

    async function login(user) {
        try {
            const data = await api.post('/users/login', user)
                .then((response) => {
                    return response.data
                })
            alert(data.message)
            await authUser(data)
            navigate('user/profile')
        } catch (error) {
            alert(error.response.data.message)
        }
    }

    function logout() {
        setAuthenticated(false)
        localStorage.removeItem('token')
        api.defaults.headers.Authorization = undefined
        navigate('/')
        alert('Logout realizado com sucesso')
    }

    return { authenticated, register, login, logout }

}

export default useAuth