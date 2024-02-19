import { within, expect, userEvent } from '@storybook/test';

import type { Meta, StoryObj } from '@storybook/react';

import { OrderBy } from './';

const meta = {
  component: OrderBy,
} satisfies Meta<typeof OrderBy>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    nextjs: {
      router: {
        pathname: '/posts',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const combobox = canvas.getByRole('combobox');
    await expect(combobox).toHaveDisplayValue('更新日時順');
  },
};

export const Selected: Story = {
  parameters: {
    nextjs: {
      router: {
        pathname: '/posts',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const combobox = canvas.getByRole('combobox');

    await userEvent.selectOptions(combobox, 'starCount');
    await expect(combobox).toHaveDisplayValue('スター数順');
  },
};
