import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { getPostsData } from '@/services/server/Posts/__mock__/fixture';
import { BasicLayoutDecorator, PCStory, SPStory } from '@/tests/storybook';

import { Posts } from './';

export default {
  component: Posts,
  args: getPostsData,
  decorators: [BasicLayoutDecorator],
} satisfies Meta<typeof Posts>;

type Story = StoryObj<typeof Posts>;

export const Default: Story = {
  args: {
    ...getPostsData,
  },
  parameters: {
    ...PCStory,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const heading = canvas.getByRole('heading', {
      name: '最新投稿一覧',
    });

    /** 見出しの表示 */
    await expect(heading).toBeInTheDocument();
    /** 見出しの表示 */

    /** 主要コンテンツの表示 */
    const list = canvas.getByRole('region', {
      name: '記事一覧',
    });
    await expect(list).toBeInTheDocument();

    const navigation = canvas.getByRole('navigation', {
      name: 'ページネーション',
    });
    await expect(navigation).toBeInTheDocument();

    const region = canvas.getByRole('region', {
      name: '現在表示中の一覧概要',
    });
    await expect(region).toBeInTheDocument();
    /** 主要コンテンツの表示 */
  },
};

export const SP: Story = { ...SPStory };
