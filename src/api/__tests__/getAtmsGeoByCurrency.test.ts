import axios from 'axios';

import { ATMS_API_URL } from '@/constants/api';

import { getAtmsGeoByCurrency } from '../getAtmsGeoByCurrency';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('getAtmsGeoByCurrency', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should fetch ATMs geo coordinates by currency with correct parameters', async () => {
    const currency = 'USD';

    const mockResponseData = {
      data: {
        Data: {
          ATM: [
            {
              atmId: '14205',
              type: 'ATM',
              baseCurrency: 'BYN',
              currency: 'BYN USD ',
              ATM_printer: true,
              cards: ['БЕЛКАРТ', 'Visa', 'MasterCard', 'UPI', 'МИР'],
              currentStatus: 'On',
              Address: {
                streetName: 'Независимости',
                buildingNumber: '3/2 ',
                townName: 'Минск',
                countrySubDivision: 'Минск',
                country: 'BY',
                addressLine: 'ТЦ "Столица"',
                description: 'Внутренний',
                Geolocation: {
                  GeographicCoordinates: {
                    latitude: '53.896111',
                    longitude: '27.548889',
                  },
                },
              },
              Services: [
                {
                  serviceType: 'Оплата услуг мобильных операторов',
                  description: '',
                },
                {
                  serviceType: 'Выдача наличных',
                  description: '',
                },
                {
                  serviceType: 'Изменение PIN-кода',
                  description: '',
                },
                {
                  serviceType: 'Перевод с карты на карту',
                  description: '',
                },
                {
                  serviceType: 'Получение наличных по коду без использования карты',
                  description: '',
                },
              ],
              Availability: {
                access24Hours: false,
                isRestricted: false,
                sameAsOrganization: true,
                StandardAvailability: {
                  Day: [
                    {
                      dayCode: '01',
                      openingTime: '10:00',
                      closingTime: '22:00',
                      Break: {
                        breakFromTime: '00:00',
                        breakToTime: '00:00',
                      },
                    },
                    {
                      dayCode: '02',
                      openingTime: '10:00',
                      closingTime: '22:00',
                      Break: {
                        breakFromTime: '00:00',
                        breakToTime: '00:00',
                      },
                    },
                    {
                      dayCode: '03',
                      openingTime: '10:00',
                      closingTime: '22:00',
                      Break: {
                        breakFromTime: '00:00',
                        breakToTime: '00:00',
                      },
                    },
                    {
                      dayCode: '04',
                      openingTime: '10:00',
                      closingTime: '22:00',
                      Break: {
                        breakFromTime: '00:00',
                        breakToTime: '00:00',
                      },
                    },
                    {
                      dayCode: '05',
                      openingTime: '10:00',
                      closingTime: '22:00',
                      Break: {
                        breakFromTime: '00:00',
                        breakToTime: '00:00',
                      },
                    },
                    {
                      dayCode: '06',
                      openingTime: '10:00',
                      closingTime: '22:00',
                      Break: {
                        breakFromTime: '00:00',
                        breakToTime: '00:00',
                      },
                    },
                    {
                      dayCode: '07',
                      openingTime: '10:00',
                      closingTime: '22:00',
                      Break: {
                        breakFromTime: '00:00',
                        breakToTime: '00:00',
                      },
                    },
                  ],
                },
              },
              ContactDetails: {
                phoneNumber: '+375(17)373-04-74',
              },
            },
          ],
        },
      },
    };

    mockedAxios.get.mockResolvedValue(mockResponseData);

    const response = await getAtmsGeoByCurrency(currency);

    expect(axios.get).toHaveBeenCalledWith(`${ATMS_API_URL}${currency}`);

    expect(response).toEqual([
      {
        latitude: '53.896111',
        longitude: '27.548889',
      },
    ]);
  });
});
