import {Summary, Stats, Global} from './model/CovidAPI';
import {useQuery} from 'react-query';

async function api<T>(url: string, requestOptions: any): Promise<T> {
  return fetch(url, requestOptions).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json() as Promise<T>;
  });
}

export const getSummary = (): Promise<Summary> => {
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

export const getSummaryPerCountry = () => {
  return getSummary().then((summary: Summary) => {
    return summary.Countries;
  });
};

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

export const getWorldSummary = (
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

/** React Queries */
export const useSummaryPerCountryQuery = () => {
  return useQuery('summaryPerCountry', getSummaryPerCountry, {
    refetchInterval: 30 * 1000, // Refetch the data every 10sec-
    cacheTime: 60e3,
    staleTime: 50e3,
    retry: 3,
    retryDelay: 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};

export const useWorldSummaryChartQuery = (fromDate: Date, toDate: Date) => {
  return useQuery(
    ['worldSummaryChart'],
    () => getWorldSummary(fromDate, toDate),
    {
      refetchInterval: 30 * 1000, // Refetch the data every 10sec-
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
