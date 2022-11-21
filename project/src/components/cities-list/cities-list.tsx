import {Link} from 'react-router-dom';
import classnames from 'classnames';
import {memo} from 'react';
import {useParams} from 'react-router';

import {cities, SortType} from '../../consts';

type CitiesListProp = {
  sortRef: React.MutableRefObject<SortType>;
  setUlState: React.Dispatch<React.SetStateAction<boolean>>;
}

function CitiesList(props: CitiesListProp): JSX.Element {
  // eslint-disable-next-line no-console
  console.log('cities-list');
  const {city} = useParams();

  const getLinkClassName = (linkCity : string) =>
    classnames(
      'locations__item-link tabs__item',
      {'tabs__item--active': linkCity === city}
    );

  const sortReset = () => {
    props.sortRef.current = SortType.Popular;
    props.setUlState(false);
  };

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {cities.map((el) => (
            <li
              key={el}
              className="locations__item"
            >
              <Link
                className={getLinkClassName(el)}
                to={`/${el}`}
                onClick={() => sortReset}
              >
                <span>{el}</span>
              </Link>
            </li>
          )
          )}
        </ul>
      </section>
    </div>
  );
}

export default memo(CitiesList);
