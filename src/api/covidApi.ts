import {Summary, Stats, Global} from './model/CovidAPI';

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

  return api<Summary>('https://api.covid19api.com/summary', requestOptions);
};

export const getStats = async (): Promise<Stats> => {
  const myHeaders = new Headers();
  myHeaders.append('Origin', 'http://localhost');

  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };

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

  return api<Global[]>(
    `https://api.covid19api.com/world?from=${
      fromDate.toISOString().split('T')[0]
    }&to=${toDate.toISOString().split('T')[0]}`,
    requestOptions,
  );
};
