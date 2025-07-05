import { setupServer } from 'msw/node'
import { handlers } from './handlers.js'

export const server = setupServer(...handlers)
// Cria uma instância do servidor MSW para Node.js
// Ele usará os handlers que definimos para interceptar requisições.
