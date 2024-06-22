export enum RoutePath {
  HOME = '/',
  TIMELINE = '/timeline',
  BANKCARD = '/bankcard',
  CONTACTS = '/contacts',
}

export const ROUTES = [
  { path: RoutePath.HOME, name: 'Home' },
  { path: RoutePath.TIMELINE, name: 'Timeline' },
  { path: RoutePath.BANKCARD, name: 'Bank card' },
  { path: RoutePath.CONTACTS, name: 'Contacts' },
];
