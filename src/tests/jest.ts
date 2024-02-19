import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { setupServer } from 'msw/node';

import type { RequestHandler } from 'msw';

export const setupMockServer = (...handlers: RequestHandler[]) => {
  const server = setupServer(...handlers);
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());
  return server;
};

export const selectImageFile = (
  inputTestId = 'file',
  fileName = 'hello.png',
  content = 'hello',
) => {
  const user = userEvent.setup();
  const filePath = [`C:\\fakepath\\${fileName}`];
  const file = new File([content], fileName, { type: 'image/png' });
  const fileInput = screen.getByTestId(inputTestId);
  const selectImage = async () => await act(() => user.upload(fileInput, file));
  return { fileInput, filePath, selectImage };
};

const original = window.location;

export const mockWindowLocationReload = () => {
  Object.defineProperty(window, 'location', {
    writable: true,
    value: { reload: jest.fn() },
  });
  const cleanup = () => {
    Object.defineProperty(window, 'location', {
      writable: true,
      value: original,
    });
  };
  return cleanup;
};
