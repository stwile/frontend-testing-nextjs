import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import {
  getMyPostsData,
  getMyPostsEmptyData,
} from '@/services/server/MyPosts/__mock__/fixture';

import { Posts } from './';

export default {
  component: Posts,
  args: getMyPostsData,
} satisfies Meta<typeof Posts>;

type Story = StoryObj<typeof Posts>;

export const Default: Story = {
  args: getMyPostsData,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const list = canvas.getByRole('region', {
      name: '投稿記事一覧',
    });

    /** アクセシブルネーム「投稿記事一覧」で識別できる */
    await expect(list).toBeInTheDocument();
    /** アクセシブルネーム「投稿記事一覧」で識別できる */

    /** 記事一覧があるとき、コンテンツが表示される */
    const postList = canvas.queryByRole('region', {
      name: '記事一覧',
    });
    await expect(postList).toBeInTheDocument();

    const pagination = canvas.queryByRole('navigation', {
      name: 'ページネーション',
    });
    await expect(pagination).toBeInTheDocument();

    const paginationInfo = canvas.queryByRole('region', {
      name: '現在表示中の一覧概要',
    });
    await expect(paginationInfo).toBeInTheDocument();

    const noItems = canvas.queryByRole('heading', {
      name: '投稿記事がありません',
    });
    await expect(noItems).not.toBeInTheDocument();
    /** 記事一覧があるとき、コンテンツが表示される */
  },
};

export const NoItems: Story = {
  args: getMyPostsEmptyData,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    /** 記事一覧があるとき、コンテンツが表示される */
    const postList = canvas.queryByRole('region', {
      name: '記事一覧',
    });
    await expect(postList).not.toBeInTheDocument();

    const pagination = canvas.queryByRole('navigation', {
      name: 'ページネーション',
    });
    await expect(pagination).not.toBeInTheDocument();

    const paginationInfo = canvas.queryByRole('region', {
      name: '現在表示中の一覧概要',
    });
    await expect(paginationInfo).not.toBeInTheDocument();

    const noItems = canvas.queryByRole('heading', {
      name: '投稿記事がありません',
    });
    await expect(noItems).toBeInTheDocument();
    /** 記事一覧があるとき、コンテンツが表示される */
  },
};
