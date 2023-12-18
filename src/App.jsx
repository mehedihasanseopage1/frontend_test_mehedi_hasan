import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import RootLayout from './components/layouts/RootLayout'

function App() {
  const [count, setCount] = useState(0)

  return (
    <RootLayout>
      <div className="">hello</div>
    </RootLayout>
  )
}

export default App
