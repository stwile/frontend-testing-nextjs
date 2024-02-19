import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { generatePagination } from '@/lib/util/pagination';

import { Pagination } from './';

export default {
  component: Pagination,
  args: { pathname: '/posts' },
} satisfies Meta<typeof Pagination>;

type Story = StoryObj<typeof Pagination>;

export const NoContent: Story = {
  args: {
    pagination: generatePagination(0, 9),
  },
  parameters: {
    nextjs: {
      query: {
        page: 0,
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const navigation = canvas.queryByRole('navigation', {
      name: 'ページネーション',
    });

    /** 現在ページ値を渡していない場合、レンダリングされない */
    await expect(navigation).toBeNull();
  },
};
