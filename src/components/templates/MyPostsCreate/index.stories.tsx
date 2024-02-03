import { Meta, StoryObj } from '@storybook/react';

import { BasicLayoutDecorator, PCStory, SPStory } from '@/tests/storybook';

import { MyPostsCreate } from './';

export default {
  component: MyPostsCreate,
  decorators: [BasicLayoutDecorator],
} satisfies Meta<typeof MyPostsCreate>;

type Story = StoryObj<typeof MyPostsCreate>;

export const Default: Story = { ...PCStory };

export const SP: Story = { ...SPStory };
