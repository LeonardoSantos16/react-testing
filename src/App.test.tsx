// Para que o jest entenda que é um arquivo de test é preciso que tenha a extensão **.test.** ou **.spec.**
import { fireEvent, getByText, render, screen } from '@testing-library/react'
import App from './App'
const sum = (x: number, y: number) => {
  return x + y
}

//describe: bloco onde é possível colocar vários testes, função que recebe como parâmetro nome e a função
describe('App component', () => {
  it('should sum correctly', () => {
    expect(sum(4, 4)).toBeGreaterThan(7)
  })

  it('should render App with hello message', () => {
    render(<App />)

    screen.getByText('Hello world!')
  })

  it('should change message on button click', () => {
    render(<App />)

    screen.getByText('Let`s learn more about testing in React')
    const button = screen.getByText(/change message/i)
    fireEvent.click(button)

    screen.getByText(/new message!/i)

    const oldMessage = screen.queryByText(
      'Let`s learn more about testing in React'
    )

    expect(oldMessage).not.toBeInTheDocument()
  })
})
