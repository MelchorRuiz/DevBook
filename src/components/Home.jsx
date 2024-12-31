import { Link } from 'react-router-dom';

export const Home = () => {
    return (
        <div className="bg-slate-900/30 flex-1 rounded-lg p-4 flex flex-col pt-20 items-center gap-10">
            <h1 className="text-8xl font-bold text-center">Diviertete estudiando programación</h1>
            <h3 className="text-2xl text-white/60 text-center">Este proyecto es una aplicación web diseñada para ayudar a los programadores a tomar notas de manera interactiva. Permite a los usuarios crear documentos de notas, agregar ejercicios y código.</h3>
            <div className='flex gap-4 items-center'>
                <Link to="/documentos">
                    <button className="p-3 text-xl text-black bg-amber-400/90 rounded-lg hover:bg-amber-400/70 hover:scale-105 hover:rotate-3">
                        Empezar
                    </button>
                </Link>
                <a 
                    className="text-lg"
                    href="https://github.com/MelchorRuiz/DevBook"
                >
                    Código fuente &rarr;
                </a>
            </div>
        </div>
    )
}