import {datatype} from 'faker';

import {appData} from './app-data';
import {fakeRoomInfo,
  makeFakeComment,
  makeFakeOffers,
  makeFakeNearbyOffers,
  makeFakeComments,
  makeFakeFavoriteOffers,
} from '../../utils/mocks';
import {
  fetchOffersAction,
  fetchRoomInfoAction,
  fetchCommentsAction,
  fetchNearbyOffersAction,
  fetchFavoriteOffersAction,
  fetchPostCommentAction,
  fetchPostOfferFavoriteStatusAction
} from '../api-actions';

const fakeOffers = makeFakeOffers();
const fakeNearbyOffers = makeFakeNearbyOffers();
const fakeComments = makeFakeComments();
const fakeFavoriteOffers = makeFakeFavoriteOffers();
const fakeNewComment = makeFakeComment(datatype.number());

const initialState = {
  offers: [],
  roomInfo: null,
  comments: [],
  nearbyOffers: [],
  favoriteOffers: [],
  isOffersDataLoading: false,
  isRoomInfoDataLoading: false,
  isCommentsDataLoading: false,
  isNearbyOffersDataLoading: false,
  isCommentPostStatus: false,
  isCommentSubmitSuccessful: false,
  isFavoriteOffersDataLoading: false,
  isFavoriteOffersPostStatus: false,
};


describe('Reducer: appData', () => {
  it('1. without additional parameters should return initial state', () => {
    expect(appData.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual(initialState);
  });

  it('2.1. should set isOffersDataLoading when load offers', () => {
    const state = initialState;
    expect(appData.reducer(state, {type: fetchOffersAction.pending.type}))
      .toEqual({...state, isOffersDataLoading: true});
  });

  it('2.2 should update offers by load offers and set isOffersDataLoading', () => {
    const state = initialState;
    expect(appData.reducer(state, {type: fetchOffersAction.fulfilled.type, payload: fakeOffers}))
      .toEqual({...state, offers: fakeOffers, isOffersDataLoading: false});
  });

  it('3.1. should set isRoomInfoDataLoading when load roomInfo', () => {
    const state = initialState;
    expect(appData.reducer(state, {type: fetchRoomInfoAction.pending.type}))
      .toEqual({...state, isRoomInfoDataLoading: true});
  });

  it('3.2. should update roomInfo by load roomInfo and set isRoomInfoDataLoading', () => {
    const state = initialState;
    expect(appData.reducer(state, {type: fetchRoomInfoAction.fulfilled.type, payload: fakeRoomInfo}))
      .toEqual({...state, roomInfo: fakeRoomInfo, isRoomInfoDataLoading: false});
  });

  it('4.1. should set isNearbyOffersDataLoading when load nearbyOffers', () => {
    const state = initialState;
    expect(appData.reducer(state, {type: fetchNearbyOffersAction.pending.type}))
      .toEqual({...state, isNearbyOffersDataLoading: true});
  });

  it('4.2. should update nearbyOffers by load nearbyOffers and set isNearbyOffersDataLoading', () => {
    const state = initialState;
    expect(appData.reducer(state, {type: fetchNearbyOffersAction.fulfilled.type, payload: fakeNearbyOffers}))
      .toEqual({...state, nearbyOffers: fakeNearbyOffers, isNearbyOffersDataLoading: false});
  });

  it('5.1. should set isCommentsDataLoading when load comments', () => {
    const state = initialState;
    expect(appData.reducer(state, {type: fetchCommentsAction.pending.type}))
      .toEqual({...state, isCommentsDataLoading: true});
  });

  it('5.2. should update comments by load comments and set isCommentsDataLoading', () => {
    const state = initialState;
    expect(appData.reducer(state, {type: fetchCommentsAction.fulfilled.type, payload: fakeComments}))
      .toEqual({...state, comments: fakeComments, isCommentsDataLoading: false});
  });

  it('6.1. should set isFavoriteOffersDataLoading when load favoriteOffers', () => {
    const state = initialState;
    expect(appData.reducer(state, {type: fetchFavoriteOffersAction.pending.type}))
      .toEqual({...state, isFavoriteOffersDataLoading: true});
  });

  it('6.2. should update favoriteOffers by load favoriteOffers and set isFavoriteOffersDataLoading', () => {
    const state = initialState;
    expect(appData.reducer(state, {type: fetchFavoriteOffersAction.fulfilled.type, payload: fakeFavoriteOffers}))
      .toEqual({...state, favoriteOffers: fakeFavoriteOffers, isFavoriteOffersDataLoading: false});
  });

  it('7.1. should set isCommentPostStatus when post comment', () => {
    const state = {...initialState};
    expect(appData.reducer(state, {type: fetchPostCommentAction.pending.type}))
      .toEqual({...state, isCommentPostStatus: true});
  });

  it('7.2. should update comments before post comment and set isCommentSubmitSuccessful, isCommentPostStatus', () => {
    const state = {...initialState, comments: fakeComments};
    const updateComments = fakeComments.slice();
    updateComments.push(fakeNewComment);
    expect(appData.reducer(state, {type: fetchPostCommentAction.fulfilled.type, payload: updateComments}))
      .toEqual({...state, comments: updateComments, isCommentPostStatus: false, isCommentSubmitSuccessful: true});
  });

  it('7.3. should set isCommentSubmitSuccessful, isCommentPostStatus flag if server is unavailable', () => {
    const state = initialState;
    expect(appData.reducer(state, {type: fetchPostCommentAction.rejected.type}))
      .toEqual({...state, isCommentSubmitSuccessful: false, isCommentPostStatus: false});
  });

  it('8.1. should set isCommentPostStatus when post comment', () => {
    const state = {...initialState};
    expect(appData.reducer(state, {type: fetchPostCommentAction.pending.type}))
      .toEqual({...state, isCommentPostStatus: true});
  });

  it('8.2. should update favoriteOffers, offers, roomInfo before post comment and set isFavoriteOffersPostStatus', () => {
    const state = {...initialState, roomInfo: fakeRoomInfo, offers: fakeOffers, nearbyOffers: fakeNearbyOffers};
    const favoriteOffer = {...fakeRoomInfo, isFavorite: !fakeRoomInfo.isFavorite};
    const updateOffers =
    fakeOffers.map((item) => {
      if (item.id !== favoriteOffer.id) {
        return item;
      }
      return {
        ...item,
        ...favoriteOffer
      };
    });
    const updateNearbyOffers =
    fakeNearbyOffers.map((item) => {
      if (item.id !== favoriteOffer.id) {
        return item;
      }
      return {
        ...item,
        ...favoriteOffer
      };
    });

    expect(appData.reducer(state, {type: fetchPostOfferFavoriteStatusAction.fulfilled.type, payload: favoriteOffer}))
      .toEqual({...state, roomInfo: favoriteOffer, isFavoriteOffersPostStatus: false, offers: updateOffers, nearbyOffers: updateNearbyOffers});
  });
});
