import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';

import Upload from '../../src/components/Upload';

interface DataTransfer {
  dataTransfer: {
    files: File[];
    items: {
      kind: string;
      type: string;
      getAsFile(): File;
    }[];
    types: string[];
  };
}

describe('Upload', () => {
  function mockData(files: File[]): DataTransfer {
    return {
      dataTransfer: {
        files,
        items: files.map(file => ({
          kind: 'file',
          type: file.type,
          getAsFile: () => file,
        })),
        types: ['Files'],
      },
    };
  }

  it('should not be able to upload a non supported file', async () => {
    const file = new File([JSON.stringify({ ping: true })], 'ping.json', {
      type: 'application/json',
    });
    const data = mockData([file]);
    const onUpload = jest.fn();

    const component = <Upload onUpload={onUpload} />;
    const { container, getByText } = render(component);
    const dropzone = container.querySelector('div');

    if (dropzone) {
      await act(async () => {
        fireEvent.dragEnter(dropzone, data);
      });
    }

    expect(getByText('Arquivo não suportado')).toBeInTheDocument();
  });

  it('should be able to show a message when dragging a file', async () => {
    const file = new File([JSON.stringify({ ping: true })], 'ping.json', {
      type: 'text/csv',
    });
    const data = mockData([file]);
    const onUpload = jest.fn();

    const component = <Upload onUpload={onUpload} />;
    const { container, getByText } = render(component);
    const dropzone = container.querySelector('div');

    if (dropzone) {
      await act(async () => {
        fireEvent.dragEnter(dropzone, data);
      });
    }

    expect(getByText('Solte o arquivo aqui')).toBeInTheDocument();
  });

  it('should be able to upload a file', async () => {
    const onUpload = jest.fn();
    const { getByTestId } = render(<Upload onUpload={onUpload} />);

    const input = getByTestId('upload');
    const file = new File(
      [
        'title, type, value, category\n' +
          'Loan, income, 1500, Others\n' +
          'Website Hosting, outcome, 50, Others\n' +
          'Ice cream, outcome, 3, Food',
      ],
      'import.csv',
      {
        type: 'text/csv',
      },
    );

    await act(async () => {
      fireEvent.change(input, { target: { files: [file] } });
    });

    expect(onUpload).toHaveBeenCalledWith([file]);
  });
});
