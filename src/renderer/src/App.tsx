import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom'

import SignIn from './views/Sign-in'
import SignUp from './views/Sign-up'

function App(): JSX.Element {
  // const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />
      </Routes>
    </Router>
  )
}

export default App
