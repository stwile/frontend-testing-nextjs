import { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';

import { getMyPostsData } from '@/services/server/MyPosts/__mock__/fixture';

import { PostItem } from './';

export default {
  component: PostItem,
  parameters: {
    a11y: {
      config: {
        rules: [
          {
            id: 'label',
            enabled: false,
          },
          {
            id: 'listitem',
            enabled: false,
          },
        ],
      },
    },
  },
} satisfies Meta<typeof PostItem>;

type Story = StoryObj<typeof PostItem>;

export const Default: Story = {
  args: { post: getMyPostsData.posts[0] },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const link = canvas.getByRole('link');

    /** リンクのアクセシブルネームはタイトルを参照する */
    await expect(link).toHaveAccessibleName(getMyPostsData.posts[0].title);
    /** リンクのアクセシブルネームはタイトルを参照する */

    await userEvent.click(link);
    await expect(link).toMatchObject({
      pathname: `/my/posts/${getMyPostsData.posts[0].id}`,
    });
  },
};

export const Draft: Story = {
  args: {
    post: {
      ...getMyPostsData.posts[0],
      published: false,
    },
  },
};
