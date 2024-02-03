import { Meta, StoryObj } from '@storybook/react';

import { getPostsData } from '@/services/server/Posts/__mock__/fixture';
import { BasicLayoutDecorator, PCStory, SPStory } from '@/tests/storybook';

import { Posts } from './';

export default {
  component: Posts,
  args: getPostsData,
  decorators: [BasicLayoutDecorator],
} satisfies Meta<typeof Posts>;

type Story = StoryObj<typeof Posts>;

export const Default: Story = { ...PCStory };

export const SP: Story = { ...SPStory };
