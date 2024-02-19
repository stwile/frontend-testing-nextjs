import { Meta, StoryObj } from '@storybook/react';

import * as MyPost from '@/services/client/MyPost/__mock__/msw';
import * as MyProfile from '@/services/client/MyProfile/__mock__/msw';
import { getMyPostData } from '@/services/server/MyPost/__mock__/fixture';
import { BasicLayoutDecorator, SPStory } from '@/tests/storybook';

import {
  publishSuccess,
  publishFailure,
  deleteSuccess,
  deleteFailure,
} from './assert';

import { MyPostEdit } from '.';

export default {
  component: MyPostEdit,
  args: {
    post: getMyPostData,
  },
  decorators: [BasicLayoutDecorator],
  parameters: {
    msw: {
      handlers: [...MyPost.handlers, ...MyProfile.handlers],
    },
    ...SPStory.parameters,
  },
} satisfies Meta<typeof MyPostEdit>;

type Story = StoryObj<typeof MyPostEdit>;

export const PublishSuccess: Story = {
  ...publishSuccess,
};

export const PublishFailure: Story = {
  ...publishFailure,
};

export const DeleteSuccess: Story = {
  ...deleteSuccess,
};

export const DeleteFailure: Story = {
  ...deleteFailure,
};
