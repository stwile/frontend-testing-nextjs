import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { TextareaWithInfo } from './';

export default {
  component: TextareaWithInfo,
  args: {
    title: '記事本文',
  },
} satisfies Meta<typeof TextareaWithInfo>;

type Story = StoryObj<typeof TextareaWithInfo>;

export const Default: Story = {};

export const Info: Story = {
  args: {
    info: '0 / 64',
  },
};

export const Description: Story = {
  args: {
    description: '不正な文字が含まれています',
  },
};

export const Error: Story = {
  args: {
    error: '不正な文字が含まれています',
  },
};

export const FullProps: Story = {
  args: {
    info: '0 / 64',
    description: '半角英数64文字以内で入力してください',
    error: '不正な文字が含まれています',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const textbox = canvas.getByRole('textbox', {
      name: '記事本文',
    });
    await expect(textbox).toHaveAccessibleDescription(
      '半角英数64文字以内で入力してください',
    );
    await expect(textbox).toHaveAccessibleErrorMessage(
      '不正な文字が含まれています',
    );
  },
};
