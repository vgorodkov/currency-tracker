import axios from 'axios';

import { BelarusbankGeoApiResponse } from '@/types/belarusbankGeoApi';

export const getAtmsGeoByCurrency = async (currency: string, limit: number = 50) => {
  const res = await axios.get<BelarusbankGeoApiResponse>(
    `/api/atms?city=Минск&ATM_currency=${currency}`
  );
  const {
    Data: { ATM },
  } = res.data;
  const geoCoords = ATM.map((atm) => atm.Address.Geolocation.GeographicCoordinates);
  return geoCoords.splice(0, limit);
};
