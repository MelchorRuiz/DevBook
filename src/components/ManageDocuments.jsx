import { useNavigate } from "react-router-dom"

export const ManageDocuments = () => {
    const navigate = useNavigate()

    return (
        <div className="bg-slate-900/30 flex-1 rounded-lg p-4 overflow-y-scroll flex gap-4 flex-wrap">
            <div 
                className="flex flex-col items-center justify-between ring-1 ring-white rounded-lg p-2 cursor-pointer min-h-52 h-fit w-36 py-6 hover:bg-white/10"
                onClick={() => navigate('/editar')}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-12">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                </svg>
                <span className="mt-2 text-center">Nuevo Documento</span>
            </div>
        </div>
    )
}