import '@testing-library/jest-dom';
import React, { ReactNode } from 'react';
import 'whatwg-fetch';

global.React = React;

jest.mock(
  'react-markdown',
  () =>
    ({ children }: { children: ReactNode }) =>
      children,
);
