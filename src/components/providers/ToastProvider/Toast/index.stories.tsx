import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import {
  ToastProvider,
  ToastState,
} from '@/components/providers/ToastProvider';

import { Toast } from '.';

const createDecorator = (defaultState?: Partial<ToastState>) => {
  const Decorator = () => {
    return (
      <ToastProvider defaultState={{ ...defaultState, isShown: true }}>
        {null}
      </ToastProvider>
    );
  };
  return Decorator;
};

export default {
  component: Toast,
} satisfies Meta<typeof Toast>;

type Story = StoryObj<typeof Toast>;

export const Succeed: Story = {
  decorators: [
    createDecorator({
      message: '成功しました',
      style: 'succeed',
    }),
  ],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const toast = canvas.getByRole('alert');
    await expect(toast).toHaveTextContent('成功しました');
  },
};

export const Failed: Story = {
  decorators: [
    createDecorator({
      message: '失敗しました',
      style: 'failed',
    }),
  ],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const toast = canvas.getByRole('alert');
    await expect(toast).toHaveTextContent('失敗しました');
  },
};

export const Busy: Story = {
  decorators: [
    createDecorator({
      message: '通信中…',
      style: 'busy',
    }),
  ],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const toast = canvas.getByRole('alert');
    await expect(toast).toHaveTextContent('通信中…');
  },
};
