import { Meta, StoryObj } from '@storybook/react';

import { ErrorMessage } from './';

export default {
  component: ErrorMessage,
  args: { children: 'エラー' },
} satisfies Meta<typeof ErrorMessage>;

type Story = StoryObj<typeof ErrorMessage>;

export const Default: Story = {};
