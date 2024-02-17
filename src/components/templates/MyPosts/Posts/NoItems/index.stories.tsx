import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { getMyPostsData } from '@/services/server/MyPosts/__mock__/fixture';

import { NoItems } from './';

export default {
  component: NoItems,
  args: getMyPostsData,
} satisfies Meta<typeof NoItems>;

type Story = StoryObj<typeof NoItems>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const heading = canvas.getByRole('heading', {
      name: '投稿記事がありません',
    });

    /** タイトル表示 */
    await expect(heading).toBeInTheDocument();
    /** タイトル表示 */

    const link = canvas.getByRole('link', {
      name: 'はじめての記事を書いてみましょう',
    });

    /** リンク押下 */
    await expect(link).toMatchObject({
      pathname: '/my/posts/create',
    });
    /** リンク押下 */
  },
};
