import React, { useState, useEffect } from 'react'
import axios from 'axios' // Usamos axios, mas fetch API funcionaria da mesma forma

// Definimos a interface para um objeto de usuário, com as propriedades que esperamos da API.
interface User {
  id: number
  name: string
  username: string
  email: string
}

function UserList() {
  // Tipamos o estado 'users' como um array de objetos User.
  const [users, setUsers] = useState<User[]>([])
  // Tipamos 'loading' como booleano.
  const [loading, setLoading] = useState<boolean>(true)
  // Tipamos 'error' como string ou null.
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Faz a requisição para a API de usuários.
        // Durante os testes, esta requisição será interceptada pelo MSW.
        // Tipamos a resposta do axios para garantir que 'data' seja um array de User.
        const response = await axios.get<User[]>(
          'https://jsonplaceholder.typicode.com/users'
        )
        setUsers(response.data)
      } catch (err) {
        // Em caso de erro na requisição
        setError('Erro ao carregar usuários.')
        console.error('Erro ao buscar usuários:', err)
      } finally {
        // Sempre define loading como false ao final da requisição
        setLoading(false)
      }
    }

    fetchUsers()
  }, []) // O array vazio garante que o useEffect rode apenas uma vez ao montar o componente

  if (loading) {
    return (
      <div className="text-center p-4">
        <p className="text-lg font-medium text-blue-600">
          Carregando usuários...
        </p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-red-600 text-center p-4 font-bold">
        <p>Erro: {error}</p>
      </div>
    )
  }

  if (users.length === 0) {
    return (
      <div className="text-center p-4">
        <p className="text-gray-600">Nenhum usuário encontrado.</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <h2 className="text-4xl font-extrabold mb-8 text-center text-gray-800">
        Lista de Usuários
      </h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <li
            key={user.id}
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1"
          >
            <p className="font-bold text-2xl text-gray-900 mb-2">{user.name}</p>
            <p className="text-gray-700 text-lg mb-1">@{user.username}</p>
            <p className="text-blue-600 text-md break-words">{user.email}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default UserList
