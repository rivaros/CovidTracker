import create from 'zustand';

import {Country} from '../api/model/Country';

interface AppState {
  countries: Country[];
  removeAllCountries: () => void;
}

export const useStore = create<AppState>(set => ({
  countries: [],
  removeAllCountries: () => set({countries: []}),
}));
