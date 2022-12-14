import {store} from '../store/index';
import {AuthorizationStatus} from '../consts';
import {Offer} from './offers';
import {Comment} from './comment';

export type AppData = {
  offers: Offer[];
  roomInfo: Offer | null;
  comments: Comment[];
  nearbyOffers: Offer[];
  favoriteOffers: Offer[];
  isOffersDataLoading: boolean;
  isRoomInfoDataLoading: boolean;
  isCommentsDataLoading: boolean;
  isNearbyOffersDataLoading: boolean;
  isFavoriteOffersDataLoading: boolean;
  isCommentPostStatus: boolean;
  isCommentSubmitSuccessful: boolean;
  isFavoriteOffersPostStatus: boolean;
};

export type UserProcess = {
  authStatus: AuthorizationStatus;
  authUser: string;
  isSigning: boolean;
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
