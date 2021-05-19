import { useState, useEffect } from 'react';
import axios from 'axios';

const AIRPLANE_URL = 'https://infinite-dawn-93085.herokuapp.com/aircrafts';
const FLIGHT_URL = 'https://infinite-dawn-93085.herokuapp.com/flights';

const ERROR_DATA = {
  state: 'ERROR',
  data: []
};

export function useFlights() { return useDataFetch(FLIGHT_URL); }
export function useAirplanes() { return useDataFetch(AIRPLANE_URL); }

function useDataFetch(url: string) {
  const [data, setData] = useState({
    state: 'LOADING',
    data: []
  });

  useEffect(() => {
    axios.get(url)
      .then((result: any) => {
        setData({
          state: 'DONE',
          data: result.data.data
        });
      })
      .catch(() => {
        setData(ERROR_DATA);
      });
  }, []);

  return data;
}
