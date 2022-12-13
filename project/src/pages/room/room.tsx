import {useParams} from 'react-router';
import {useEffect} from 'react';
import classnames from 'classnames';
import {Helmet} from 'react-helmet-async';

import RoomReviews from '../../components/room/room-review/room-reviews';
import NotFound from '../../pages/not-found/not-found';
import LoadingScreen from '../../pages/loading-screen/loading-screen';
import NearbyBlock from '../../components/room/nearby-blok/nearby-block';

import {useAppSelector, useAppDispatch} from '../../hooks';
import useFavorite from '../../hooks/use-favorite';

import {fetchRoomInfoAction, fetchCommentsAction, fetchNearbyOffersAction} from '../../store/api-actions';
import {getAuthCheckedStatus} from '../../store/user-process/selectors';
import {getOffersDataLoadingStatus, getRoomInfoDataLoadingStatus, getRoomInfo, getOffersIds} from '../../store/app-data/selectors';
import {RoomInfoPhotoCountSlice} from '../../consts';
import { getRoundRatingStarsWidthPercent } from '../../utils/utils';

function Room(): JSX.Element {
  const isAuthChecked = useAppSelector(getAuthCheckedStatus);
  const isOffersDataLoading = useAppSelector(getOffersDataLoadingStatus);
  const isRoomInfoDataLoading = useAppSelector(getRoomInfoDataLoadingStatus);
  const roomInfo = useAppSelector(getRoomInfo);
  const {id} = useParams();
  const availableOffersIDs = useAppSelector(getOffersIds);
  const dispatch = useAppDispatch();
  const handleFavorite = useFavorite(roomInfo);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      dispatch(fetchRoomInfoAction(id));
      dispatch(fetchCommentsAction(id));
      dispatch(fetchNearbyOffersAction(id));
      window.scrollTo(0, 0);
    }
    return () => {
      isMounted = false;
    };
  }, [id]);

  if (id && !availableOffersIDs.includes(id)) {
    return <NotFound />;
  }

  if (isRoomInfoDataLoading || isOffersDataLoading || !isAuthChecked || !roomInfo) {
    return (
      <LoadingScreen />
    );
  }

  const getFavoriteButtonClassName = () =>
    classnames(
      'property__bookmark-button button',
      {'property__bookmark-button--active': roomInfo?.isFavorite}
    );

  const ratingStarsWidth = getRoundRatingStarsWidthPercent(roomInfo?.rating);
  return (
    <main className="page__main page__main--property">
      <Helmet>
        <title>{roomInfo && `6 cities - ${roomInfo?.title} in ${roomInfo?.city.name}`}</title>
      </Helmet>
      <section className="property">
        <div className="property__gallery-container container">
          <div className="property__gallery">
            {roomInfo?.images.slice(RoomInfoPhotoCountSlice.Begin, RoomInfoPhotoCountSlice.End).map((img) => (
              <div className="property__image-wrapper" key={img}>
                <img className="property__image" src={img} alt="Photo studio" />
              </div>)
            )}
          </div>
        </div>
        <div className="property__container container">
          <div className="property__wrapper">
            {roomInfo?.isPremium &&
              <div className="property__mark">
                <span>Premium</span>
              </div>}
            <div className="property__name-wrapper">
              <h1 className="property__name">
                {roomInfo?.title}
              </h1>
              <button
                className={getFavoriteButtonClassName()}
                type="button"
                onClick={handleFavorite}
                data-testid="to-bookmarks"
              >
                <svg className="place-card__bookmark-icon" width="31" height="33">
                  <use xlinkHref="#icon-bookmark"></use>
                </svg>
                <span className="visually-hidden">To bookmarks</span>
              </button>
            </div>
            <div className="property__rating rating">
              <div className="property__stars rating__stars">
                <span style={{width: `${ratingStarsWidth}%`}}></span>
                <span className="visually-hidden">Rating</span>
              </div>
              <span className="property__rating-value rating__value">{roomInfo?.rating}</span>
            </div>
            <ul className="property__features">
              <li className="property__feature property__feature--entire">
                {roomInfo?.type}
              </li>
              <li className="property__feature property__feature--bedrooms">
                {roomInfo?.bedrooms}
              </li>
              <li className="property__feature property__feature--adults">
                Max {roomInfo?.maxAdults} adults
              </li>
            </ul>
            <div className="property__price">
              <b className="property__price-value">&euro;{roomInfo?.price}</b>
              <span className="property__price-text">&nbsp;night</span>
            </div>
            <div className="property__inside">
              <h2 className="property__inside-title">What&apos;s inside</h2>
              <ul className="property__inside-list">
                {roomInfo?.goods.map((good) => <li key={good} className="property__inside-item">{good}</li>)}
              </ul>
            </div>
            <div className="property__host">
              <h2 className="property__host-title">Meet the host</h2>
              <div className="property__host-user user">
                <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                  <img className="property__avatar user__avatar" src={roomInfo?.host.avatarUrl} width="74" height="74" alt="Host avatar" />
                </div>
                <span className="property__user-name">
                  {roomInfo?.host.name}
                </span>
                <span className="property__user-status">
                  {roomInfo?.host.isPro}
                </span>
              </div>
              <div className="property__description">
                <p className="property__text">
                  {roomInfo?.description}
                </p>
              </div>
            </div>
            <RoomReviews />
          </div>
        </div>
      </section>
      <NearbyBlock />
    </main>
  );
}

export default Room;
