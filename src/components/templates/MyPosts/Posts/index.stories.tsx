import { Meta, StoryObj } from '@storybook/react';

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

export const Default: Story = {};

export const NoItems: Story = {
  args: getMyPostsEmptyData,
};
