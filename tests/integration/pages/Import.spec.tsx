import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import MockAdapter from 'axios-mock-adapter';
import { act } from 'react-dom/test-utils';
import { toast } from 'react-toastify';
import { render, fireEvent } from '@testing-library/react';

import api from '../../../src/services/api';
import Import from '../../../src/pages/Import';

jest.mock('react-toastify');

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => {
  return {
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => {
      return mockNavigate;
    },
  };
});

// eslint-disable-next-line global-require
jest.mock('../../../src/components/Upload', () =>
  require('../../../mocks/Upload'),
);

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

    const { getByTestId } = render(
      <Router location={history.location} navigator={history}>
        <Import />
      </Router>,
    );

    await act(async () => {
      fireEvent.change(getByTestId('file'));
    });

    await act(async () => {
      fireEvent.click(getByTestId('submit'));
    });

    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('should not be able to upload without select a file', async () => {
    mockNavigate.mockClear();
    const { getByTestId } = render(
      <Router location={history.location} navigator={history}>
        <Import />
      </Router>,
    );

    await act(async () => {
      fireEvent.click(getByTestId('submit'));
    });

    expect(mockNavigate).not.toHaveBeenCalled();
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

    const { getByTestId } = render(
      <Router location={history.location} navigator={history}>
        <Import />
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

  it('should be able to upload a file', async () => {
    const { getByText, getByTestId } = render(
      <Router location={history.location} navigator={history}>
        <Import />
      </Router>,
    );

    await act(async () => {
      fireEvent.change(getByTestId('file'));
    });

    expect(getByText('example.csv')).toBeTruthy();
  });
});
