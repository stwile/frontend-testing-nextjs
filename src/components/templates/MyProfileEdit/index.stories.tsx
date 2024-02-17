import { Meta, StoryObj } from '@storybook/react';

import { getMyProfileData } from '@/services/server/MyProfile/__mock__/fixture';
import { BasicLayoutDecorator, PCStory, SPStory } from '@/tests/storybook';

import { MyProfileEdit } from './';

export default {
  component: MyProfileEdit,
  args: { profile: getMyProfileData },
  decorators: [BasicLayoutDecorator],
} satisfies Meta<typeof MyProfileEdit>;

type Story = StoryObj<typeof MyProfileEdit>;

export const Default: Story = { ...PCStory };

export const SP: Story = { ...SPStory };
