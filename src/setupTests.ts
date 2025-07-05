import '@testing-library/jest-dom'

// Importa a instância do servidor MSW que criamos

// Polyfill para TextEncoder e TextDecoder no ambiente Node.js.
// O MSW (ou suas dependências) pode usar essas APIs de navegador,
// que não estão disponíveis globalmente no Node.js por padrão.
// Importamos de 'util' (ou 'node:util' em Node.js mais recente)

// Atribuímos as implementações de 'util' aos globais.
// Usamos @ts-ignore para suprimir erros de tipo que podem ocorrer devido a
// pequenas diferenças nas assinaturas de tipo entre 'util' e as definições globais do DOM.
// Em tempo de execução, essas implementações são compatíveis para o que o MSW precisa.
// @ts-ignore
// @ts-ignore

// Inicia o servidor MSW antes de todos os testes serem executados.
// Isso garante que o MSW esteja ativo e interceptando requisições.

// Reseta qualquer handler de requisição que pode ter sido sobrescrito
// em testes individuais. Isso é crucial para garantir que cada teste
// seja isolado e não afete os resultados de outros testes.

// Fecha o servidor MSW depois que todos os testes terminaram.
// Libera os recursos e garante que o MSW não interfira em outras operações.

import '@testing-library/jest-dom/vitest' // Ou '@testing-library/jest-dom' para Jest
import { server } from './mocks/node'

// Inicia o servidor MSW antes de todos os testes
beforeAll(() => server.listen())

// Reseta todos os handlers para suas configurações iniciais após cada teste
afterEach(() => server.resetHandlers())

// Encerra o servidor MSW após todos os testes
