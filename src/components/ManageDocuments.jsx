import { Link } from "react-router-dom"

export const ManageDocuments = () => {
    return (
        <div className="bg-slate-900/30 flex-1 rounded-lg p-4 overflow-y-scroll">
            <h2 className='text-4xl'>Administrar documentos</h2>
            <p className='text-lg pt-2'>Aquí podrás crear y editar documentos de desarrollo.</p>
            <Link to='/editar'>
                <button className='mt-4 bg-slate-800/50 hover:bg-slate-800/70 text-white font-bold py-2 px-4 rounded'>
                    Crear nuevo documento
                </button>
            </Link>
        </div>
    )
}