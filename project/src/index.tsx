import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import {ToastContainer} from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import App from './components/app/app';
import HistoryRouter from './components/history-route/history-route';
import browserHistory from './browser-history';

import {store} from './store';
import {fetchOffersAction, checkAuthAction} from './store/api-actions';

store.dispatch(fetchOffersAction());
store.dispatch(checkAuthAction());

const root = ReactDOM.createRoot(
  document.querySelector('#root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <HistoryRouter history={browserHistory}>
      <Provider store = {store}>
        <ToastContainer />
        <App />
      </Provider>
    </HistoryRouter>
  </React.StrictMode>,
);
