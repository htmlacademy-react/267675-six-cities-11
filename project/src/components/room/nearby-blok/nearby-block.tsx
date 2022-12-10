import {memo} from 'react';

import Map from '../../map/map';
import NearbyRooms from './nearby-rooms';
import Spinner from '../../spinner/spinner';

import {useAppSelector} from '../../../hooks';

import {MapStyle} from '../../../consts';
import {getNearbyOffers, getNearbyOffersDataLoadingStatus} from '../../../store/app-data/selectors';

function NearbyBlock(): JSX.Element {
  const nearbyOffers = useAppSelector(getNearbyOffers);
  const isNearbyOffersDataLoading = useAppSelector(getNearbyOffersDataLoadingStatus);

  if (isNearbyOffersDataLoading) {
    const spinnerSize = {
      width: 1145,
      height: 1003,
    };
    return (
      <section className="near-places places" data-testid='nearby-block-spinner'>
        <Spinner spinnerSize={[spinnerSize.height, spinnerSize.width]}/>
      </section>
    );
  }

  return (
    <>
      <section className="property__map map" data-testid='nearby-block-map'>
        <Map
          offers={nearbyOffers}
          mapStyle={MapStyle.Room}
        />
      </section>
      <div className="container" data-testid='nearby-block-rooms'>
        <NearbyRooms />
      </div>
    </>
  );
}

export default memo(NearbyBlock);
