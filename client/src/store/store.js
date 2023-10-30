import { create } from 'zustand';

export const useAuthStore = create((set) => ({
    auth: {
        username: localStorage.getItem('username') || '', // Retrieve from local storage
        teacherId: localStorage.getItem('teacherId') || '', // Retrieve teacherId from local storage
        active: false,
    },
    setUsername: (name) => {
        localStorage.setItem('username', name); // Save to local storage
        set((state) => ({ auth: { ...state.auth, username: name } }))
    },
    setTeacherId: (id) => {
        localStorage.setItem('teacherId', id); // Save teacherId to local storage
        set((state) => ({ auth: { ...state.auth, teacherId: id } }));
    },
}));
