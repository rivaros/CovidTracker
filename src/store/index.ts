import create from 'zustand';
import produce from 'immer';
import {
  CASE_ACTIVE,
  CASE_DEATH,
  CASE_RECOVERY,
} from '../common/constants/caseTypes';
import {Country} from '../api/model/CovidAPI';
import {CaseRecords} from '../common/types/CaseRecords';

interface AppState {
  ready: boolean;
  setReady: (val: boolean) => void;

  countrySortMode: number;
  setCountrySortMode: (sortMode: number) => void;

  countrySearchString: string;
  setCountrySearchString: (searchString: string) => void;

  countryList: Country[];
  setCountryList: (countries: Country[]) => void;

  countryReportedCases: CaseRecords;
  addCountryCase: (countryCode: string, caseType: string) => void;
}

export const useStore = create<AppState>(set => ({
  ready: false,
  setReady: val => set({ready: val}),

  countrySortMode: 0,
  setCountrySortMode: sortMode => set({countrySortMode: sortMode}),

  countrySearchString: '',
  setCountrySearchString: (searchString: string) =>
    set({countrySearchString: searchString}),

  countryList: [],
  setCountryList: countries => {
    set({countryList: countries});
  },

  countryReportedCases: {},
  addCountryCase: (countryCode, caseType) => {
    set(
      produce(state => {
        let propName: string = '';
        switch (caseType) {
          case CASE_ACTIVE:
            propName = 'NewConfirmed';
            break;
          case CASE_DEATH:
            propName = 'NewDeaths';
            break;
          case CASE_RECOVERY:
            propName = 'NewRecovered';
            break;
          default:
            return;
        }

        if (!state.countryReportedCases[countryCode]) {
          state.countryReportedCases[countryCode] = {};
        }
        if (state.countryReportedCases[countryCode][propName]) {
          state.countryReportedCases[countryCode][propName]++;
        } else {
          state.countryReportedCases[countryCode][propName] = 1;
        }
      }),
    );
  },
}));
