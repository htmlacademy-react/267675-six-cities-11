import {useNavigate} from 'react-router-dom';

import {useAppDispatch, useAppSelector} from '.';

import {Offer} from '../types/offers';
import {AppRoute, FavoriteStatus} from '../consts';
import {getAuthorization} from '../store/user-process/selectors';
import {fetchPostOfferFavoriteStatusAction} from '../store/api-actions';

function useFavorite(offer : Offer | null): () => void {
  const isAuthChecked = useAppSelector(getAuthorization);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleFavorite = () => {
    if (!isAuthChecked) {
      navigate(AppRoute.Login);
    } else {
      dispatch(fetchPostOfferFavoriteStatusAction([String(offer?.id), offer?.isFavorite ? FavoriteStatus.Del : FavoriteStatus.Add]));
    }
  };

  return handleFavorite;
}

export default useFavorite;
