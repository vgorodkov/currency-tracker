import axios from 'axios';

import { ATMS_API_URL } from '@/constants/api';
import { BelarusbankGeoApiResponse } from '@/types/belarusbankGeoApi';

export const getAtmsGeoByCurrency = async (currency: string, limit: number = 50) => {
  const res = await axios.get<BelarusbankGeoApiResponse>(`${ATMS_API_URL}${currency}`);
  const {
    Data: { ATM },
  } = res.data;
  const geoCoords = ATM.map((atm) => atm.Address.Geolocation.GeographicCoordinates);
  return geoCoords.splice(0, limit);
};
