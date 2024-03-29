import { render, screen } from '@testing-library/react';

import { TextboxWithError } from './';

describe('TextboxWithError', () => {
  test('エラーメッセージがない', () => {
    render(<TextboxWithError name="title" />);
    expect(screen.getByRole('textbox')).toBeValid();
    expect(screen.getByRole('textbox')).not.toHaveErrorMessage();
  });

  test('エラーメッセージがある', () => {
    const error = 'エラーがあります';
    render(<TextboxWithError name="title" error={error} />);
    expect(screen.getByRole('textbox')).toBeInvalid();
    expect(screen.getByRole('textbox')).toHaveErrorMessage(error);
  });
});
