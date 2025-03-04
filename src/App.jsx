import Profile from './Profile'
import './App.css'
import { UsernameProvider } from './UsernameContext'

function App() {


  return (
    <>
    <UsernameProvider>
     <Profile/>
     </UsernameProvider>
    </>
  )
}

export default App
