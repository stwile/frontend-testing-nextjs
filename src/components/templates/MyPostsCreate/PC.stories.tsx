import { Meta, StoryObj } from '@storybook/react';

import * as MyPost from '@/services/client/MyPost/__mock__/msw';
import * as MyProfile from '@/services/client/MyProfile/__mock__/msw';
import { BasicLayoutDecorator, PCStory } from '@/tests/storybook';

import {
  publishSuccess,
  // publishFailure,
  // deleteSuccess,
  // deleteFailure,
} from './assert';

import { MyPostsCreate } from '.';

export default {
  component: MyPostsCreate,
  decorators: [BasicLayoutDecorator],
  parameters: {
    msw: {
      handlers: [...MyPost.handlers, ...MyProfile.handlers],
    },
    ...PCStory.parameters,
  },
} satisfies Meta<typeof MyPostsCreate>;

type Story = StoryObj<typeof MyPostsCreate>;

export const PublishSuccess: Story = {
  ...publishSuccess,
};

// export const PublishFailure: Story = {
//   ...publishFailure,
// };

// export const DeleteSuccess: Story = {
//   ...deleteSuccess,
// };

// export const DeleteFailure: Story = {
//   ...deleteFailure,
// };
