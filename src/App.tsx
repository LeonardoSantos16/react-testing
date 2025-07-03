import { useState } from 'react'

function App() {
  const [message, setMassage] = useState(
    'Let`s learn more about testing in React'
  )
  return (
    <div>
      <h1>Hello world!</h1>
      <p>{message}</p>
      <button
        style={{ backgroundColor: 'red', color: 'white', padding: 10 }}
        onClick={() => setMassage('New message!')}
      >
        Change message
      </button>
    </div>
  )
}

export default App
