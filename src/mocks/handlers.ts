import { http, HttpResponse } from 'msw'

// Definimos um array de handlers que o MSW usará para interceptar requisições.
// Cada handler especifica o método HTTP, a URL e a resposta mockada.
export const handlers = [
  // Intercepta requisições GET para a API de usuários do JSONPlaceholder
  // A função de resposta recebe:
  // - req: Objeto da requisição (contém URL, parâmetros, corpo, etc.)
  // - res: Função para construir a resposta mockada
  // - ctx: Utilitários para construir a resposta (status, JSON, atraso, etc.)
  // return HttpResponse.json(
  //           { message: 'Erro interno do servidor mockado!' },
  //           { status: 500 }
  //         )
  http.get('https://jsonplaceholder.typicode.com/users', () => {
    return HttpResponse.json({
      id: 'abc-123',
      firstName: 'John',
      lastName: 'Maverick',
    })
  }),
  // Você pode adicionar mais handlers aqui para outras rotas POST, PUT, etc.
]
