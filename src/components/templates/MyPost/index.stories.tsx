import { Meta, StoryObj } from '@storybook/react';

import { getMyPostData } from '@/services/server/MyPost/__mock__/fixture';
import { BasicLayoutDecorator, PCStory, SPStory } from '@/tests/storybook';

import { MyPost } from './';

export default {
  component: MyPost,
  args: { post: getMyPostData },
  decorators: [BasicLayoutDecorator],
} satisfies Meta<typeof MyPost>;

type Story = StoryObj<typeof MyPost>;

export const Default: Story = { ...PCStory };

export const SP: Story = { ...SPStory };
