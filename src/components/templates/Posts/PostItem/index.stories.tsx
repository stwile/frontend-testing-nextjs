import { Meta, StoryObj } from '@storybook/react';

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

export const Default: Story = {
  args: { post: getPostsData.posts[0] },
};

export const Draft: Story = {
  args: { post: { ...getPostsData.posts[0], published: false } },
};
