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
  gridConfig: { rows: number; cols: number };
  user?: User;
  selectedCageId?: string;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  addCage: (cage: Cage) => void;
  updateCage: (cage: Cage) => void;
  setGridConfig: (rows: number, cols: number) => void;
  addMouse: (mouse: Mouse) => void;
  updateMouse: (mouse: Mouse) => void;
  setSelectedCage: (id: string | undefined) => void;
  moveMouse: (mouseId: string, targetCageId: string) => void;
}

const useStore = create<State>()(
  persist(
    (set, get) => ({
      cages: [
        { id: 'C11', position: { row: 1, col: 1 }, status: '配对中', mice: ['M001', 'M002'] },
        { id: 'C12', position: { row: 1, col: 2 }, status: '隔离中', mice: ['M003'] },
        { id: 'C13', position: { row: 1, col: 3 }, status: '待鉴定', mice: [] },
        { id: 'C21', position: { row: 2, col: 1 }, status: '已怀孕', mice: [] },
        { id: 'C22', position: { row: 2, col: 2 }, status: '临产', mice: ['M004', 'M005'] },
      ],
      mice: [
        {
          id: 'M001',
          earTag: '001',
          strain: 'C57BL/6',
          gender: 'M',
          birthDate: '2024-01-01',
          parents: { father: 'F1', mother: 'M1' },
          genotypeStatus: '待鉴定',
          notes: '正常',
        },
        {
          id: 'M002',
          earTag: '002',
          strain: 'C57BL/6',
          gender: 'F',
          birthDate: '2024-01-02',
          parents: { father: 'F1', mother: 'M1' },
          genotypeStatus: '待鉴定',
          notes: '配对中',
        },
        {
          id: 'M003',
          earTag: '003',
          strain: 'Balb/c',
          gender: 'M',
          birthDate: '2023-12-01',
          parents: { father: 'F2', mother: 'M2' },
          genotypeStatus: 'WT',
          notes: '隔离观察',
        },
        {
          id: 'M004',
          earTag: '004',
          strain: 'ICR',
          gender: 'F',
          birthDate: '2023-10-05',
          parents: { father: 'F3', mother: 'M3' },
          genotypeStatus: 'Het',
          notes: '孕鼠',
        },
        {
          id: 'M005',
          earTag: '005',
          strain: 'ICR',
          gender: 'F',
          birthDate: '2023-10-05',
          parents: { father: 'F3', mother: 'M3' },
          genotypeStatus: 'KO',
          notes: '哺乳中',
        },
      ],
      gridConfig: { rows: 3, cols: 3 },
      user: undefined,
      selectedCageId: 'C11',
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
      setGridConfig: (rows: number, cols: number) =>
        set({ gridConfig: { rows, cols } }),
      addMouse: (mouse: Mouse) => set({ mice: [...get().mice, mouse] }),
      updateMouse: (mouse: Mouse) =>
        set({ mice: get().mice.map(m => (m.id === mouse.id ? mouse : m)) }),
      setSelectedCage: (id: string | undefined) => set({ selectedCageId: id }),
      moveMouse: (mouseId: string, targetCageId: string) => {
        const updatedCages = get().cages.map(c => {
          let mice = c.mice;
          if (mice.includes(mouseId)) {
            mice = mice.filter(id => id !== mouseId);
          }
          if (c.id === targetCageId) {
            mice = [...mice, mouseId];
          }
          return { ...c, mice };
        });
        set({ cages: updatedCages });
      },
    }),
    { name: 'mousefit-storage' }
  )
);

export default useStore;
