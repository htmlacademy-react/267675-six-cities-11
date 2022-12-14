export enum AppRoute {
  Default = '/',
  Login = '/login',
  Main = '/:city',
  Favorites = '/favorites',
  Room = '/:city/offer/:id',
  Error = '*',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum MapStyle {
  Main = 'Main__map',
  Room = 'Room__map',
}

export enum SortType {
  Popular = 'Popular',
  PriceLowToHigh = 'Price: low to high',
  PriceHighToLow = 'Price: high to low',
  TopRatedFirst = 'Top rated first',
}

export enum APIRoute {
  Offers = '/hotels/',
  NearbyOffers = '/nearby',
  Comments = '/comments/',
  Login = '/login',
  Logout = '/logout',
  Favorite = '/favorite/',
}

export enum NameSpace {
  Data = 'DATA',
  User = 'USER',
}

export enum FavoriteStatus {
  Add = '/1',
  Del = '/0',
}

export enum RoomInfoPhotoCountSlice {
  Begin = 0,
  End = 6,
}

export enum CommentsCountSlice {
  Begin = 0,
  End = 10,
}

export const cities = [
  'Paris',
  'Cologne',
  'Brussels',
  'Amsterdam',
  'Hamburg',
  'Dusseldorf'
];

export const defaultCityInfo = {
  'name': 'Paris',
  'location': {
    'latitude': 48.85661,
    'longitude': 2.351499,
    'zoom': 13
  },
} as const;
