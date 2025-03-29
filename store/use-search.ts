import { create } from 'zustand';

interface SearchStore {
  searchKeyword: string;
  setSearchKeyword: (keyword: string) => void;
}

export const useSearchStore = create<SearchStore>((set) => ({
  searchKeyword: '',
  setSearchKeyword: (keyword) => set({ searchKeyword: keyword }),
}));
