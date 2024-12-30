import { DocumentEditor } from "./components/DocumentEditor"
import { DocumentPreview } from "./components/DocumentPreview"
import { LoginButton, Profile } from "./components/Auth"
import useUserStore from "./store/useUserStore"

function App() {
  const { isAuthenticated } = useUserStore()

  return (
    <div className='bg-slate-800 w-screen h-screen flex flex-col font-roboto text-white max-h-screen'>
      <header className="flex justify-between items-center p-4 bg-slate-900/20">
        <p className='text-3xl font-bold cursor-pointer hover:rotate-3 hover:scale-105'>
          DEV BOOK
        </p>
        {isAuthenticated ? (
          <Profile />
        ) : (
          <LoginButton />
        )}
      </header>
      <main className="flex gap-4 flex-1 p-4 min-h-96">
        <DocumentEditor />
        <DocumentPreview />
      </main>
    </div>
  )
}

export default App
