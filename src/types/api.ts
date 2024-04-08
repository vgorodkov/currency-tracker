interface GeographicCoordinates {
  latitude: number;
  longitude: number;
}

interface Geolocation {
  GeographicCoordinates: GeographicCoordinates;
}

interface Address {
  streetName: string;
  buildingNumber: string;
  townName: string;
  countrySubDivision: string;
  country: string;
  addressLine: string;
  description: string;
  Geolocation: Geolocation;
}

interface Break {
  breakFromTime: string;
  breakToTime: string;
}

interface Day {
  dayCode: string;
  openingTime: string;
  closingTime: string;
  Break: Break;
}

interface StandardAvailability {
  Day: Day[];
}

interface Availability {
  access24Hours: boolean;
  isRestricted: boolean;
  sameAsOrganization: boolean;
  StandardAvailability: StandardAvailability;
}

interface Services {
  serviceType: string;
  description: string;
}

interface ATM {
  atmId: string;
  type: string;
  baseCurrency: string;
  currency: string;
  ATM_printer: boolean;
  cards: string[];
  currentStatus: string;
  Address: Address;
  Services: Services[];
  Availability: Availability;
  ContactDetails: {
    phoneNumber: string;
  };
}

interface Data {
  ATM: ATM[];
}

export interface ApiResponse {
  Data: Data;
}
