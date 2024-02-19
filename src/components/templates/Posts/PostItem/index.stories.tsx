import { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';

import { getPostsData } from '@/services/server/Posts/__mock__/fixture';

import { PostItem } from './';

export default {
  component: PostItem,
  parameters: {
    a11y: {
      config: {
        rules: [
          { id: 'label', enabled: false },
          { id: 'listitem', enabled: false },
        ],
      },
    },
  },
} satisfies Meta<typeof PostItem>;

type Story = StoryObj<typeof PostItem>;

export const Published: Story = {
  args: {
    post: getPostsData.posts[0],
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    const link = canvas.getByRole('link');

    /** リンクのアクセシブルネームはタイトルを参照する */
    await expect(link).toHaveAccessibleName(args.post.title);

    /** リンクを押下すると画面遷移する */
    await userEvent.click(link);
    await expect(link).toMatchObject({ pathname: `/posts/${args.post.id}` });
  },
};

export const UnPublished: Story = {
  args: {
    post: getPostsData.posts[0],
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    const link = canvas.getByRole('link');

    /** リンクのアクセシブルネームはタイトルを参照する */
    await expect(link).toHaveAccessibleName(args.post.title);

    /** リンクを押下すると画面遷移する */
    await userEvent.click(link);
    await expect(link).toMatchObject({ pathname: `/posts/${args.post.id}` });
  },
};
