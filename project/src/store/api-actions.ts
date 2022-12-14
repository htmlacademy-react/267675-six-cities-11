import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';

import {redirectToRouteAction} from './action';
import {saveToken, dropToken} from '../services/token';
import {APIRoute, AppRoute} from '../consts';

import {AppDispatch, State} from '../types/state.js';
import {Offer} from '../types/offers';
import {Comment, NewComment} from '../types/comment';
import {AuthData, ResponseAuthData} from '../types/auth-data';
import {UserData} from '../types/user-data';

export const fetchOffersAction = createAsyncThunk<Offer[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<Offer[]>(APIRoute.Offers);
    return data;
  },
);

export const fetchRoomInfoAction = createAsyncThunk<Offer, string | undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchRoomInfo',
  async (id, {extra: api}) => {
    const {data} = await api.get<Offer>(id ? `${APIRoute.Offers}${id}` : '');
    return data;
  },
);

export const fetchCommentsAction = createAsyncThunk<Comment[], string | undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchComments',
  async (id, {extra: api}) => {
    const {data} = await api.get<Comment[]>(id ? `${APIRoute.Comments}${id}` : '');
    return data;
  },
);

export const fetchPostCommentAction = createAsyncThunk<Comment[], [NewComment, string | undefined], {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/addComment',
  async ([{comment, rating}, id], {extra: api}) => {
    const {data} = await api.post<Comment[]>(id ? `${APIRoute.Comments}${id}` : '', {comment, rating});
    return data;
  },
);

export const fetchNearbyOffersAction = createAsyncThunk<Offer[], string | undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchNearbyOffers',
  async (id, {extra: api}) => {
    const {data} = await api.get<Offer[]>(id ? `${APIRoute.Offers}${id}${APIRoute.NearbyOffers}` : '');
    return data;
  },
);

export const fetchFavoriteOffersAction = createAsyncThunk<Offer[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchFavoriteOffers',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<Offer[]>(APIRoute.Favorite);
    return data;
  },
);

export const fetchPostOfferFavoriteStatusAction = createAsyncThunk<Offer, [string | undefined, string | undefined], {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/changeOfferFavoriteStatus',
  async ([id, status], {extra: api}) => {
    const {data} = await api.post<Offer>(id && status ? `${APIRoute.Favorite}${id}${status}` : '');
    return data;
  },
);

export const checkAuthAction = createAsyncThunk<string, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {extra: api}) => {
    const res = await api.get<ResponseAuthData>(APIRoute.Login);
    return res.data.email;
  },
);

export const loginAction = createAsyncThunk<string, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    const {data: {token}} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(token);
    dispatch(redirectToRouteAction(AppRoute.Default));
    return email;
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, {extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
  },
);
