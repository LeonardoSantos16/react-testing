import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom' // Importa os matchers estendidos do Jest para DOM

// Importa o componente UserList (agora .tsx)
import UserList from './UserList'
import { server } from '../mocks/node' // Importa a instância do servidor MSW
import { http, HttpResponse } from 'msw' // Importa 'rest' para sobrescrever handlers em testes específicos

// Os hooks beforeAll, afterEach e afterAll já estão configurados em src/setupTests.js.
// Não precisamos redefini-los aqui, pois eles serão executados globalmente para todos os testes.
// No entanto, para fins de demonstração e clareza, estou deixando-os comentados aqui para lembrar sua função.

/*
beforeAll(() => server.listen()); // Inicia o servidor MSW antes de todos os testes neste arquivo
afterEach(() => server.resetHandlers()); // Reseta os handlers após cada teste para garantir isolamento
afterAll(() => server.close()); // Fecha o servidor MSW após todos os testes
*/

describe('UserList Component', () => {
  it('deve exibir a mensagem de carregamento e depois a lista de usuários mockados', async () => {
    // 1. Renderiza o componente UserList
    render(<UserList />)

    // 2. Verifica se a mensagem de carregamento é exibida inicialmente
    // getByText é síncrono e espera que o elemento esteja presente imediatamente
    expect(screen.getByText('Carregando usuários...')).toBeInTheDocument()

    // 3. Espera que o conteúdo mockado da API apareça na tela.
    // findByText é assíncrono e retorna uma Promise, esperando até que o elemento apareça (ou um timeout ocorra).
    // Isso é crucial para testar requisições assíncronas.
    expect(await screen.findByText('Leanne Graham (Mock)')).toBeInTheDocument()
    expect(screen.getByText('@Bret')).toBeInTheDocument()
    expect(screen.getByText('Ervin Howell (Mock)')).toBeInTheDocument()
    expect(screen.getByText('@Antonette')).toBeInTheDocument()
    expect(screen.getByText('Clementine Bauch (Mock)')).toBeInTheDocument()
    expect(screen.getByText('@Samantha')).toBeInTheDocument()

    // 4. Verifica se a mensagem de carregamento desapareceu após os dados serem carregados
    // queryByText é usado para verificar a ausência de um elemento, pois ele retorna null se não encontrar.
    expect(screen.queryByText('Carregando usuários...')).not.toBeInTheDocument()
  })

  it('deve exibir uma mensagem de erro se a requisição de usuários falhar', async () => {
    // 1. Sobrescreve o handler padrão do MSW para simular um erro de API
    // server.use() adiciona um handler que tem precedência sobre os handlers globais
    // para este teste específico.
    server.use(
      http.get('https://jsonplaceholder.typicode.com/users', () => {
        // Retorna um status de erro (500 Internal Server Error) e uma mensagem JSON
        return res('Erro interno do servidor mockado!', {
          status: 500,
        })
      })
    )

    // 2. Renderiza o componente UserList
    render(<UserList />)

    // 3. Espera que a mensagem de erro apareça na tela
    // findByText com Regex para ser insensível a maiúsculas/minúsculas
    expect(
      await screen.findByText(/Erro ao carregar usuários./i)
    ).toBeInTheDocument()

    // 4. Verifica se a mensagem de carregamento desapareceu
    expect(screen.queryByText('Carregando usuários...')).not.toBeInTheDocument()
  })

  it('deve exibir "Nenhum usuário encontrado." se a API retornar uma lista vazia', async () => {
    // 1. Sobrescreve o handler para retornar um array vazio de usuários
    server.use(
      http.get(
        'https://jsonplaceholder.typicode.com/users',
        // A assinatura do handler no MSW v2 é ({ request, params, cookies }, { json, status, delay }) => HttpResponse
        () => {
          // Retorna um status de erro (500 Internal Server Error) e uma mensagem JSON
          return HttpResponse.json(
            { message: 'Erro interno do servidor mockado!' },
            { status: 500 }
          )
        }
      )
    )

    // 2. Renderiza o componente UserList
    render(<UserList />)

    // 3. Espera que a mensagem de "Nenhum usuário encontrado." apareça na tela
    expect(
      await screen.findByText('Nenhum usuário encontrado.')
    ).toBeInTheDocument()

    // 4. Verifica se a mensagem de carregamento desapareceu
    expect(screen.queryByText('Carregando usuários...')).not.toBeInTheDocument()
  })
})
function res(
  arg0: any,
  arg1: any
): import('msw').AsyncResponseResolverReturnType<undefined> {
  throw new Error('Function not implemented.')
}
