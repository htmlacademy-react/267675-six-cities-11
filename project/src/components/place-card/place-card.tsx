import {Link} from 'react-router-dom';
import classnames from 'classnames';

import useFavorite from '../../hooks/use-favorite';

import {Offer} from '../../types/offers';
import {getRoundRatingStarsWidthPercent, setFirstLetterToUppercase} from '../../utils/utils';

type PlaceCardProps = {
  offer: Offer;
  setActiveCard?: React.Dispatch<React.SetStateAction<number>>;
}

function PlaceCard({offer, setActiveCard}: PlaceCardProps): JSX.Element {
  const getFavoriteButtonClassName = () =>
    classnames(
      'place-card__bookmark-button button',
      {'place-card__bookmark-button--active': offer.isFavorite}
    );

  const offerType = setFirstLetterToUppercase(offer.type);

  const ratingStarsWidth = getRoundRatingStarsWidthPercent(offer.rating);

  const handleFavorite = useFavorite(offer);

  return (
    <article
      onMouseOver={() => {setActiveCard && setActiveCard(offer.id);}}
      className="cities__card place-card"
      data-testid="card-article"
    >
      {offer.isPremium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to={`/${offer.city.name}/offer/${offer.id}`}>
          <img className="place-card__image" src={offer.previewImage} width="260" height="200" alt="Place image" />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={getFavoriteButtonClassName()}
            type="button"
            onClick={handleFavorite}
            data-testid="to-bookmarks"
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${ratingStarsWidth}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/${offer.city.name}/offer/${offer.id}`}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{offerType}</p>
      </div>
    </article>
  );
}

export default PlaceCard;
