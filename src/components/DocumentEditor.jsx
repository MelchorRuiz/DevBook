import MonacoEditor from '@monaco-editor/react';
import useDocumentStore from '../store/useDocumentStore';

export const DocumentEditor = () => {
    const { title, setTitle, description, setDescription, exercises, addExercise, updateExercise, deleteExercise } = useDocumentStore();

    const handleAddExercise = () => {
        addExercise({ text: '', code: '' });
    }

    const handleExerciseChange = (index, key, value) => {
        updateExercise(index, { ...exercises[index], [key]: value });
    }
    return (
        <div className="bg-slate-900/30 flex-1 p-4 rounded-lg flex flex-col gap-2">
            <div className='h-full overflow-y-scroll'>
                <div className='flex flex-col gap-1'>
                    <label>Título del Documento:</label>
                    <input
                        type="text"
                        className='text-black p-1 bg-gray-200 focus-visible:outline-none rounded-md'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className='flex flex-col gap-1'>
                    <label>Descripción:</label>
                    <input
                        value={description}
                        className='text-black p-1 bg-gray-200 focus-visible:outline-none rounded-md'
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className='w-full h-[1px] bg-gray-200 my-4' />
                <div className='flex flex-col gap-6'>
                    {exercises.map((exercise, index) => (
                        <div key={index} className='flex flex-col gap-2'>
                            <textarea
                                value={exercise.text}
                                className='text-black p-1 focus-visible:outline-none rounded-md resize-none bg-gray-200'
                                onChange={(e) =>
                                    handleExerciseChange(index, 'text', e.target.value)
                                }
                            />
                            <MonacoEditor
                                height='120px'
                                defaultLanguage='javascript'
                                defaultValue={exercise.code}
                                theme='vs-dark'
                                onChange={(value) => handleExerciseChange(index, 'code', value)}
                                options={{
                                    fontSize: 14,
                                    wordWrap: 'on',
                                    suggestOnTriggerCharacters: false,
                                    quickSuggestions: false,
                                    wordBasedSuggestions: false,
                                    padding: { top: 10, bottom: 10 },
                                    overviewRulerBorder: false,
                                    scrollBeyondLastLine: false,
                                }}
                            />
                            <button
                                className='bg-red-400 text-black rounded-md p-1'
                                onClick={() => deleteExercise(index)}
                            >
                                Eliminar
                            </button>
                        </div>
                    ))}
                    <button
                        className='bg-blue-400 text-black rounded-md p-1'
                        onClick={handleAddExercise}
                    >
                        Agregar Ejercicio
                    </button>
                </div>
            </div>
        </div>
    )
}
