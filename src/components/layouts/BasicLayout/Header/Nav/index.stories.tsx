import { within, expect } from '@storybook/test';

import type { Meta, StoryObj } from '@storybook/react';

import { Nav } from './';

const meta = {
  component: Nav,
} satisfies Meta<typeof Nav>;
export default meta;

type Story = StoryObj<typeof meta>;

export const MyPosts: Story = {
  args: {
    onCloseMenu: () => {},
  },
  parameters: {
    nextjs: {
      router: {
        pathname: '/my/posts',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const link = canvas.getByRole('link', { name: 'My Posts' });
    await expect(link).toHaveAttribute('aria-current', 'page');
  },
};

export const CreatePost: Story = {
  args: {
    onCloseMenu: () => {},
  },
  parameters: {
    nextjs: {
      router: {
        pathname: '/my/posts/create',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const link = canvas.getByRole('link', { name: 'Create Post' });
    await expect(link).toHaveAttribute('aria-current', 'page');
  },
};
