import { Meta, StoryObj } from '@storybook/react';

import { getPostData } from '@/services/server/Post/__mock__/fixture';
import { BasicLayoutDecorator, PCStory, SPStory } from '@/tests/storybook';

import { checkDisplay } from './assert';

import { Post } from './';

export default {
  component: Post,
  args: { post: getPostData, user: null },
  decorators: [BasicLayoutDecorator],
} satisfies Meta<typeof Post>;

type Story = StoryObj<typeof Post>;

export const Default: Story = {
  parameters: { ...PCStory.parameters },
  play: checkDisplay.play,
};

export const SP: Story = {
  parameters: { ...SPStory.parameters },
  play: checkDisplay.play,
};
