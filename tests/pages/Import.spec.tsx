import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import MockAdapter from 'axios-mock-adapter';
import { act } from 'react-dom/test-utils';
import { toast } from 'react-toastify';
import { render, fireEvent } from '@testing-library/react';

import Routes from '../../src/routes';
import api from '../../src/services/api';

jest.mock('react-toastify');

// eslint-disable-next-line global-require
jest.mock('../../src/components/Upload', () => require('../../mocks/Upload'));

describe('Import', () => {
  const apiMock = new MockAdapter(api);
  const history = createMemoryHistory();

  it('should be able to upload a transaction file', async () => {
    apiMock
      .onPost('/transactions/import')
      .reply(200)
      .onGet('transactions')
      .reply(200, {
        transactions: [],
        balance: { income: 0, outcome: 0, total: 0 },
      });

    history.push('/import');
    const { getByTestId } = render(
      <Router history={history}>
        <Routes />
      </Router>,
    );

    await act(async () => {
      fireEvent.change(getByTestId('file'));
    });

    await act(async () => {
      fireEvent.click(getByTestId('submit'));
    });

    expect(history.location.pathname).toBe('/');
  });

  it('should not be able to upload without select a file', async () => {
    history.push('/import');
    const { getByTestId } = render(
      <Router history={history}>
        <Routes />
      </Router>,
    );

    await act(async () => {
      fireEvent.click(getByTestId('submit'));
    });

    expect(history.location.pathname).toBe('/import');
  });

  it('should not be able to upload a transaction file', async () => {
    apiMock
      .onPost('/transactions/import')
      .reply(400)
      .onGet('transactions')
      .reply(200, {
        transactions: [],
        balance: { income: 0, outcome: 0, total: 0 },
      });

    toast.error = jest.fn();

    history.push('/import');
    const { getByTestId } = render(
      <Router history={history}>
        <Routes />
      </Router>,
    );

    await act(async () => {
      fireEvent.change(getByTestId('file'));
    });

    await act(async () => {
      fireEvent.click(getByTestId('submit'));
    });

    expect(toast.error).toHaveBeenCalledWith(
      'Request failed with status code 400',
    );
  });
});
