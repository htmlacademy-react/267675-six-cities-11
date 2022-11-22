import {memo} from 'react';

import Map from '../../map/map';
import NearbyRooms from './nearby-rooms';
import Spinner from '../../spinner/spinner';

import {MapStyle} from '../../../consts';

import {useAppSelector} from '../../../hooks';
import {getNearbyOffers, getNearbyOffersDataLoadingStatus} from '../../../store/app-data/selectors';


function NearbyBlock(): JSX.Element {
  const serverNearbyOffers = useAppSelector(getNearbyOffers);
  const isNearbyOffersDataLoading = useAppSelector(getNearbyOffersDataLoadingStatus);

  if (isNearbyOffersDataLoading) {
    const spinnerSize = {
      width: 1145,
      height: 1003,
    };
    return (
      <section className="near-places places">
        <Spinner spinnerSize={[spinnerSize.height, spinnerSize.width]}/>
      </section>
    );
  }

  return (
    <>
      <section className="property__map map">
        <Map
          offers={serverNearbyOffers}
          mapStyle={MapStyle.Room}
        />
      </section>
      <div className="container">
        <NearbyRooms />
      </div>
    </>
  );
}

export default memo(NearbyBlock);
