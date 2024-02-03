import { Args, PartialStoryFn } from '@storybook/csf';
import { Meta, StoryObj, ReactRenderer } from '@storybook/react';

import { AlertDialogState } from './AlertDialogContext';

import { AlertDialog, AlertDialogProvider } from './';

function createDecorator(defaultState?: Partial<AlertDialogState>) {
  return function Decorator(Story: PartialStoryFn<ReactRenderer, Args>) {
    return (
      <AlertDialogProvider defaultState={{ ...defaultState, isShown: true }}>
        <Story />
      </AlertDialogProvider>
    );
  };
}

export default {
  component: AlertDialog,
} satisfies Meta<typeof AlertDialog>;

type Story = StoryObj<typeof AlertDialog>;

export const Default: Story = {
  decorators: [createDecorator({ message: '成功しました' })],
};

export const CustomButtonLabel: Story = {
  decorators: [
    createDecorator({
      message: '記事を公開します。よろしいですか？',
      cancelButtonLabel: 'キャンセル',
      okButtonLabel: 'OK',
    }),
  ],
};

export const ExcludeCancel: Story = {
  decorators: [
    createDecorator({
      message: '投稿に成功しました',
      cancelButtonLabel: undefined,
      okButtonLabel: 'OK',
    }),
  ],
};
