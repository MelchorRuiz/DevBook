import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { DocumentEditor } from "./components/DocumentEditor"
import { DocumentPreview } from "./components/DocumentPreview"
import { Home } from "./components/Home"
import { ManageDocuments } from "./components/ManageDocuments"
import { LoginButton, Profile } from "./components/Auth"
import useUserStore from "./store/useUserStore"

function App() {
  const { isAuthenticated } = useUserStore()

  return (
    <BrowserRouter>
      <div className='bg-slate-800 w-screen h-screen flex flex-col font-roboto text-white max-h-screen'>
        <header className="flex justify-between items-center p-4 bg-slate-900/20">
          <nav className='flex gap-6 items-center'>
            <Link to='/'>
              <p className='text-3xl font-bold cursor-pointer hover:rotate-3 hover:scale-105'>
                DEV BOOK
              </p>
            </Link>
            <Link to='/documentos'>
              <p className='cursor-pointer hover:underline'>Documentos</p>
            </Link>
          </nav>
          {isAuthenticated ? (
            <Profile />
          ) : (
            <LoginButton />
          )}
        </header>
        <main className="flex gap-4 flex-1 p-4 min-h-96">
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/documentos' element={<ManageDocuments />} />
              <Route path='/editar' element={(
                <>
                  <DocumentEditor />
                  <DocumentPreview />
                </>
              )} />
            </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
