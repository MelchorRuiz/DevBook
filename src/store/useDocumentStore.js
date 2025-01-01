import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useDocumentStore = create(
    persist(
        (set) => ({
            name: '',
            title: '',
            description: '',
            exercises: [],
    
            // Actions
            setName: (name) => set({ name }),
            setTitle: (title) => set({ title }),
            setDescription: (description) => set({ description }),
            addExercise: (exercise) =>
                set((state) => ({ exercises: [...state.exercises, exercise] })),
            updateExercise: (index, updatedExercise) =>
                set((state) => ({
                    exercises: state.exercises.map((exercise, i) =>
                        i === index ? updatedExercise : exercise
                    ),
                })),
            deleteExercise: (index) =>
                set((state) => ({
                    exercises: state.exercises.filter((_, i) => i !== index),
                })),
            setAll: (document) => set(document),
            clear: () => set({ name: '', title: '', description: '', exercises: [] }),
        }),
        {
            name: 'document-store',
        }
    )
);

export default useDocumentStore;