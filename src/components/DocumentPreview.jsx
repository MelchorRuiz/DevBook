import { CodeBlock, dracula } from 'react-code-blocks';
import useDocumentStore from '../store/useDocumentStore';

export const DocumentPreview = () => {
    const { title, description, exercises } = useDocumentStore();

    return (
        <div className="bg-slate-900/30 flex-1 rounded-lg p-4 overflow-y-scroll">
            <h2 className='text-4xl'>{ title }</h2>
            <p className='text-lg pt-2'>{ description }</p>
            {exercises.map((exercise, index) => (
                <div key={index} className='flex flex-col gap-2 mt-4'>
                    <p className='text-base'>{index + 1} - {exercise.text}</p>
                    <CodeBlock
                        text={exercise.code}
                        language='javascript'
                        showLineNumbers={true}
                        wrapLines
                        theme={dracula}
                    />
                </div>
            ))}
        </div>
    )
}
