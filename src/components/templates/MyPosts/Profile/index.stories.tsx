import { Meta, StoryObj } from '@storybook/react';

import { getMyProfileData } from '@/services/server/MyProfile/__mock__/fixture';

import { Profile } from './';

export default {
  component: Profile,
  args: getMyProfileData,
} satisfies Meta<typeof Profile>;

type Story = StoryObj<typeof Profile>;

export const Default: Story = {};
