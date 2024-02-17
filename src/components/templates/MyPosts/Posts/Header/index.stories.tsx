import { Meta, StoryObj } from '@storybook/react';

import { getMyPostsData } from '@/services/server/MyPosts/__mock__/fixture';

import { Header } from './';

export default {
  component: Header,
  args: getMyPostsData,
} satisfies Meta<typeof Header>;

type Story = StoryObj<typeof Header>;

export const Default: Story = {};
