import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { handleGetMyProfile } from '@/services/client/MyProfile/__mock__/msw';
import { getMyPostsData } from '@/services/server/MyPosts/__mock__/fixture';
import { BasicLayoutDecorator, PCStory, SPStory } from '@/tests/storybook';

import { MyPosts } from './';

export default {
  component: MyPosts,
  args: {
    posts: getMyPostsData,
  },
  parameters: {
    msw: {
      handlers: [handleGetMyProfile()],
    },
  },
  decorators: [BasicLayoutDecorator],
} satisfies Meta<typeof MyPosts>;

type Story = StoryObj<typeof MyPosts>;

export const Default: Story = {
  parameters: { ...PCStory.parameters },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const profile = await canvas.findByRole('region', {
      name: 'プロフィール',
    });

    await expect(profile).toBeInTheDocument();

    const list = canvas.getByRole('region', {
      name: '記事一覧',
    });
    await expect(list).toBeInTheDocument();
  },
};

export const SP: Story = { ...SPStory };
