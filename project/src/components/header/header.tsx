import {Link, Outlet} from 'react-router-dom';
import {memo} from 'react';

import HeaderAuth from './header-auth';
import HeaderNoAuth from './header-no-auth';

import {useAppSelector} from '../../hooks';

import {getAuthorizationSuccess} from '../../store/user-process/selectors';

function Header(): JSX.Element {
  const isAuthorizationSuccess = useAppSelector(getAuthorizationSuccess);
  return (
    <>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link" to="/">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
              </Link>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                {isAuthorizationSuccess &&
                  <HeaderAuth />}
                {!isAuthorizationSuccess &&
                <HeaderNoAuth />}
              </ul>
            </nav>
          </div>
        </div>
      </header>
      <Outlet />
    </>

  );
}

export default memo(Header);
