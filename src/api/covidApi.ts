import {
  Summary,
  Stats,
  Global,
  SummaryCountry,
  Country,
} from './model/CovidAPI';
import {useQuery} from 'react-query';
import {useStore} from '../store';

/**
 * Generic API caller
 * @param url
 * @param requestOptions
 * @returns
 */
const api = async <T extends unknown>(
  url: string,
  requestOptions: any,
): Promise<T> => {
  const response = await fetch(url, requestOptions);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return await (response.json() as Promise<T>);
};

/**
 * /summary endpoint
 * @returns
 */
export const getSummary = async (): Promise<Summary> => {
  const myHeaders = new Headers();
  myHeaders.append('X-Access-Token', '5cf9dfd5-3449-485e-b5ae-70a60e997864');

  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };

  __DEV__ && console.log('{api call} getSummary');

  return api<Summary>('https://api.covid19api.com/summary', requestOptions);
};

/**
 * /stats endpoint
 * @returns
 */
export const getStats = async (): Promise<Stats> => {
  const myHeaders = new Headers();
  myHeaders.append('Origin', 'http://localhost');

  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };

  __DEV__ && console.log('{api call} getStats');

  return api<Stats>('https://api.covid19api.com/stats', requestOptions);
};

/**
 * /world endpoint
 * @param fromDate
 * @param toDate
 * @returns
 */
export const getWorldSummary = async (
  fromDate: Date,
  toDate: Date,
): Promise<Global[]> => {
  var requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };
  __DEV__ && console.log('{api call} getWorldSummary');
  return api<Global[]>(
    `https://api.covid19api.com/world?from=${
      fromDate.toISOString().split('T')[0]
    }&to=${toDate.toISOString().split('T')[0]}`,
    requestOptions,
  );
};

/**
 * /countries endpoint
 * @returns
 */
export const getCountries = async (): Promise<Country[]> => {
  var requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };
  __DEV__ && console.log('{api call} getCountries');
  return api<Country[]>('https://api.covid19api.com/countries', requestOptions);
};

/**
 * get list of countries only
 * @returns
 */
export const getSummaryPerCountry = async (): Promise<SummaryCountry[]> => {
  const summary = await getSummary();
  return summary.Countries;
};

/** React Queries */
export const useSummaryPerCountryQuery = () => {
  return useQuery<SummaryCountry[], Error>(
    ['summaryPerCountry'],
    getSummaryPerCountry,
    {
      refetchInterval: 30 * 1000, // Refetch the data every 30sec
      cacheTime: 60e3,
      staleTime: 50e3,
      retry: 3,
      retryDelay: 1000,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  );
};

export const useWorldSummaryChartQuery = (fromDate: Date, toDate: Date) => {
  return useQuery<Global[], Error>(
    ['worldSummaryChart'], // not passing fromDate,toDate as key to react-query, as we want to overwrite cache
    () => getWorldSummary(fromDate, toDate),
    {
      refetchInterval: 30 * 1000, // Refetch the data every 30sec
      cacheTime: 60e3,
      staleTime: 50e3,
      retry: 3,
      retryDelay: 1000,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  );
};
