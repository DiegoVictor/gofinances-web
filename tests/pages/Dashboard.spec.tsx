import React from 'react';
import { render, fireEvent, act, waitFor } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

import api from '../../src/services/api';
import Dashboard from '../../src/pages/Dashboard';

jest.mock('../../src/utils/formatValue.ts', () => ({
  __esModule: true,
  default: jest.fn().mockImplementation((value: number) => {
    switch (value) {
      case 6000:
        return 'R$ 6.000,00';
      case 50:
        return 'R$ 50,00';
      case 5950:
        return 'R$ 5.950,00';
      case 1500:
        return 'R$ 1.500,00';
      case 4500:
        return 'R$ 4.500,00';
      default:
        return '';
    }
  }),
}));

describe('Dashboard', () => {
  const apiMock = new MockAdapter(api);

  it('should be able to list the total balance inside the cards', async () => {
    const history = createMemoryHistory();

    apiMock.onGet('transactions').reply(200, {
      transactions: [
        {
          id: '807da2da-4ba6-4e45-b4f8-828d900c2adf',
          title: 'Loan',
          type: 'income',
          value: 1500,
          category: {
            id: '12a0cff7-8691-456d-b1ad-172d777f1942',
            title: 'Others',
            created_at: '2020-04-17T19:05:34.000Z',
            updated_at: '2020-04-17T19:05:34.000Z',
          },
          category_id: '12a0cff7-8691-456d-b1ad-172d777f1942',
          created_at: '2020-04-17T19:05:34.000Z',
          updated_at: '2020-04-17T19:05:34.000Z',
        },
        {
          id: '3cd3b0e3-73ef-44e9-9f19-8d815eaa7bb4',
          title: 'Computer',
          type: 'income',
          value: 4500,
          category: {
            id: '12a0cff7-8691-456d-b1ad-172d777f1942',
            title: 'Sell',
            created_at: '2020-04-18T19:05:34.000Z',
            updated_at: '2020-04-17T19:05:34.000Z',
          },
          category_id: '12a0cff7-8691-456d-b1ad-172d777f1942',
          created_at: '2020-04-18T19:05:34.000Z',
          updated_at: '2020-04-18T19:05:34.000Z',
        },
        {
          id: 'fb21571c-1087-4427-800c-3c30a484decf',
          title: 'Website Hosting',
          type: 'outcome',
          value: 50,
          category: {
            id: '12a0cff7-8691-456d-b1ad-172d777f1942',
            title: 'Hosting',
            created_at: '2020-04-17T19:05:34.000Z',
            updated_at: '2020-04-17T19:05:34.000Z',
          },
          category_id: '12a0cff7-8691-456d-b1ad-172d777f1942',
          created_at: '2020-04-19T19:05:34.000Z',
          updated_at: '2020-04-19T19:05:34.000Z',
        },
      ],
      balance: {
        income: 6000,
        outcome: 50,
        total: 5950,
      },
    });

    const { getByTestId } = render(
      <Router location={history.location} navigator={history}>
        <Dashboard />
      </Router>,
    );

    await waitFor(() => getByTestId('balance-income'));

    expect(getByTestId('balance-income')).toHaveTextContent('R$ 6.000,00');
    expect(getByTestId('balance-outcome')).toHaveTextContent('R$ 50,00');
    expect(getByTestId('balance-total')).toHaveTextContent('R$ 5.950,00');
  });

  it('should be able to list the transactions', async () => {
    const history = createMemoryHistory();

    apiMock.onGet('transactions').reply(200, {
      transactions: [
        {
          id: '807da2da-4ba6-4e45-b4f8-828d900c2adf',
          title: 'Loan',
          type: 'income',
          value: 1500,
          category: {
            id: '12a0cff7-8691-456d-b1ad-172d777f1942',
            title: 'Others',
            created_at: '2020-04-17T19:05:34.000Z',
            updated_at: '2020-04-17T19:05:34.000Z',
          },
          category_id: '12a0cff7-8691-456d-b1ad-172d777f1942',
          created_at: '2020-04-17T19:05:34.000Z',
          updated_at: '2020-04-17T19:05:34.000Z',
        },
        {
          id: '3cd3b0e3-73ef-44e9-9f19-8d815eaa7bb4',
          title: 'Computer',
          type: 'income',
          value: 4500,
          category: {
            id: '12a0cff7-8691-456d-b1ad-172d777f1942',
            title: 'Sell',
            created_at: '2020-04-18T19:05:34.000Z',
            updated_at: '2020-04-17T19:05:34.000Z',
          },
          category_id: '12a0cff7-8691-456d-b1ad-172d777f1942',
          created_at: '2020-04-18T19:05:34.000Z',
          updated_at: '2020-04-18T19:05:34.000Z',
        },
        {
          id: 'fb21571c-1087-4427-800c-3c30a484decf',
          title: 'Website Hosting',
          type: 'outcome',
          value: 50,
          category: {
            id: '12a0cff7-8691-456d-b1ad-172d777f1942',
            title: 'Hosting',
            created_at: '2020-04-17T19:05:34.000Z',
            updated_at: '2020-04-17T19:05:34.000Z',
          },
          category_id: '12a0cff7-8691-456d-b1ad-172d777f1942',
          created_at: '2020-04-19T19:05:34.000Z',
          updated_at: '2020-04-19T19:05:34.000Z',
        },
      ],
      balance: {
        income: 6000,
        outcome: 50,
        total: 5950,
      },
    });

    const { getByText } = render(
      <Router location={history.location} navigator={history}>
        <Dashboard />
      </Router>,
    );

    await waitFor(() => getByText('Loan'));

    expect(getByText('R$ 1.500,00')).toBeTruthy();
    expect(getByText('Others')).toBeTruthy();

    expect(getByText('Computer')).toBeTruthy();
    expect(getByText('R$ 4.500,00')).toBeTruthy();
    expect(getByText('Sell')).toBeTruthy();

    expect(getByText('Website Hosting')).toBeTruthy();
    expect(getByText('- R$ 50,00')).toBeTruthy();
    expect(getByText('Hosting')).toBeTruthy();
  });

  it('should be able to navigate to the import page', async () => {
    const history = createMemoryHistory();
    const { getByText } = render(
      <Router location={history.location} navigator={history}>
        <Dashboard />
      </Router>,
    );

    await act(async () => {
      fireEvent.click(getByText('Importar'));
    });

    expect(history.location.pathname).toEqual('/import');
  });
});
