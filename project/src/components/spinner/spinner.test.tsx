import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';

import HistoryRouter from '../history-route/history-route';
import Spinner from './spinner';

const history = createMemoryHistory();

describe('Component: Spinner', () => {
  it('1. should render correctly', () => {
    render(
      <HistoryRouter history={history}>
        <Spinner spinnerSize={[1,1]}/>
      </HistoryRouter>
    );
    expect(screen.getByText(/Spinner/i)).toBeInTheDocument();
  });
});
