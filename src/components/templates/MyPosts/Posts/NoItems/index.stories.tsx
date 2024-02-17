import { Meta, StoryObj } from '@storybook/react';

import { getMyPostsData } from '@/services/server/MyPosts/__mock__/fixture';

import { NoItems } from './';

export default {
  component: NoItems,
  args: getMyPostsData,
} satisfies Meta<typeof NoItems>;

type Story = StoryObj<typeof NoItems>;

export const Default: Story = {};
