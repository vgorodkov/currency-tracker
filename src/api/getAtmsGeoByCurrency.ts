import axios from 'axios';

import { ApiResponse } from '@/types/api';

export const getAtmsGeoByCurrency = async (currency: string, limit: number = 50) => {
  try {
    const res = await axios.get<ApiResponse>(`/api/atms?city=Минск&ATM_currency=${currency}`);
    const {
      Data: { ATM },
    } = res.data;
    const geoCoords = ATM.map((atm) => atm.Address.Geolocation.GeographicCoordinates);
    return geoCoords.splice(0, limit);
  } catch {
    throw new Error('Error while getting atms geo');
  }
};
