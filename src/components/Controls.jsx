import useUserStore from "../store/useUserStore"
import useDocumentStore from "../store/useDocumentStore"
import { uploadFileToDrive } from "../services/googleDriveService"

export const Controls = () => {
    const { isAuthenticated, token, folderId } = useUserStore()
    const { title, description, exercises, clear } = useDocumentStore()

    const save = async () => {
        if (!isAuthenticated) {
            alert('Inicia sesión para guardar el documento')
            return
        }

        if (!title || !description || exercises.length === 0) {
            alert('Completa todos los campos para guardar el documento')
            return
        }

        const fileContent = JSON.stringify({ title, description, exercises })

        try {
            await uploadFileToDrive(token, `${title}.json`, fileContent, folderId)
            alert('Documento guardado correctamente')
        } catch (error) {
            alert('Error al guardar el documento')
            console.error(error)
        }
    }

    return (
        <div className='fixed bottom-4 right-4 flex flex-col gap-2 items-end'>
            <div 
                className="rounded-full bg-slate-900/50 p-4 hover:bg-slate-900/70 cursor-pointer flex items-center gap-2 group w-fit"
                onClick={clear}
            >
                <label className="cursor-pointer hidden group-hover:inline">Limpiar</label>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
            </div>
            <div 
                className="rounded-full bg-slate-900/50 p-4 hover:bg-slate-900/70 cursor-pointer flex items-center gap-2 group w-fit"
                onClick={save}
            >
                <label className="cursor-pointer hidden group-hover:inline">Guardar</label>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
                </svg>
            </div>
        </div>
    )
}