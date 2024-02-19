import { within, expect, userEvent } from '@storybook/test';

import type { Meta, StoryObj } from '@storybook/react';

import { Heading } from './';

const meta = {
  component: Heading,
} satisfies Meta<typeof Heading>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    nextjs: {
      router: {
        pathname: '/posts?page=1',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const heading = canvas.getByRole('heading', { name: 'Tech Posts' });
    await expect(heading).toBeInTheDocument();

    // クリックするとTOPへ遷移する

    const link = canvas.getByRole('link');
    await userEvent.click(link);
    await expect(link).toMatchObject({ pathname: '/' });
  },
};
