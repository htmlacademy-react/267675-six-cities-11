import {memo} from 'react';

import Map from '../../map/map';
import NearbyRooms from './nearby-rooms';

import {MapStyle} from '../../../consts';
import Spinner from '../../spinner/spinner';

import {useAppSelector} from '../../../hooks';


function NearbyBlock(): JSX.Element {
  // eslint-disable-next-line no-console
  console.log('nearby-block');
  const serverNearbyOffers = useAppSelector((state) => state.serverNearbyOffers);
  const isNearbyOffersDataLoading = useAppSelector((state) => state.isNearbyOffersDataLoading);

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
