import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Cage {
  id: string;
  position: { row: number; col: number };
  status: string;
  mice: string[];
}

export interface Mouse {
  id: string;
  earTag: string;
  strain: string;
  gender: 'M' | 'F';
  birthDate: string; // ISO date
  parents: { father: string; mother: string };
  genotypeStatus: string;
  notes: string;
}

export interface User {
  username: string;
  role: 'admin' | 'user';
}

interface State {
  cages: Cage[];
  mice: Mouse[];
  user?: User;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  addCage: (cage: Cage) => void;
  updateCage: (cage: Cage) => void;
  addMouse: (mouse: Mouse) => void;
  updateMouse: (mouse: Mouse) => void;
}

const useStore = create<State>()(
  persist(
    (set, get) => ({
      cages: [],
      mice: [],
      user: undefined,
      login: (username: string, password: string) => {
        if (username === 'admin' && password === 'admin') {
          set({ user: { username, role: 'admin' } });
          return true;
        }
        if (username === 'user' && password === 'user') {
          set({ user: { username, role: 'user' } });
          return true;
        }
        return false;
      },
      logout: () => set({ user: undefined }),
      addCage: (cage: Cage) => set({ cages: [...get().cages, cage] }),
      updateCage: (cage: Cage) =>
        set({
          cages: get().cages.map(c => (c.id === cage.id ? cage : c)),
        }),
      addMouse: (mouse: Mouse) => set({ mice: [...get().mice, mouse] }),
      updateMouse: (mouse: Mouse) =>
        set({ mice: get().mice.map(m => (m.id === mouse.id ? mouse : m)) }),
    }),
    { name: 'mousefit-storage' }
  )
);

export default useStore;
