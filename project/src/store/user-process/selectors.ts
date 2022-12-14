import {NameSpace, AuthorizationStatus} from '../../consts';
import {State} from '../../types/state';

export const getAuthorizationStatus = (state: State): AuthorizationStatus => state[NameSpace.User].authStatus;
export const getAuthCheckedStatus = (state: State): boolean => state[NameSpace.User].authStatus !== AuthorizationStatus.Unknown;
export const getAuthorizationSuccess = (state: State): boolean => state[NameSpace.User].authStatus === AuthorizationStatus.Auth;
export const getAuthUser = (state: State): string => state[NameSpace.User].authUser;
export const getIsSigning = (state: State): boolean => state[NameSpace.User].isSigning;
