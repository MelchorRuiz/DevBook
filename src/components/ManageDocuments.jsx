import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { v4 as uuid } from 'uuid'
import useDocumentStore from "../store/useDocumentStore"
import useUserStore from "../store/useUserStore"
import { listFiles } from "../services/googleDriveService"

export const ManageDocuments = () => {
    const navigate = useNavigate()
    const [documents, setDocuments] = useState([])
    const { title, setName, setAll, clear } = useDocumentStore()
    const { isAuthenticated, token, folderId } = useUserStore()

    useEffect(() => {
        if (!isAuthenticated) {
            setDocuments([{
                content: {
                    title: title ? title : 'Documento Actual',
                }
            }])
        } else {
            listFiles(token, folderId)
                .then(files => {
                    setDocuments(files)
                })
                .catch(error => {
                    console.error(error)
                })
        }
    }, [isAuthenticated])

    const handleNewDocument = () => {
        clear()
        setName(`${uuid()}.json`)
        navigate('/editar')
    }

    const editDocument = async (document) => {
        console.log('Editing document:', document)
        if (document.id) {
            setAll(document.content)
            setName(document.name)
        }
        navigate('/editar')
    }

    return (
        <div className="bg-slate-900/30 flex-1 rounded-lg p-4 overflow-y-scroll flex gap-4 flex-wrap">
            <div
                className="flex flex-col items-center justify-between ring-1 ring-white rounded-lg p-2 cursor-pointer min-h-52 h-fit w-36 py-6 hover:bg-white/10"
                onClick={handleNewDocument}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-12">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                </svg>
                <span className="mt-2 text-center">Nuevo Documento</span>
            </div>
            {documents.map((document, index) => (
                <div
                    key={index}
                    className="flex flex-col items-center justify-between ring-1 ring-white rounded-lg p-2 cursor-pointer min-h-52 h-fit w-36 py-6 hover:bg-white/10"
                    onClick={() => editDocument(document)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-12">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                    </svg>
                    <span className="mt-2 text-center truncate max-w-full text-wrap">{document.content.title}</span>
                </div>
            ))}
        </div>
    )
}