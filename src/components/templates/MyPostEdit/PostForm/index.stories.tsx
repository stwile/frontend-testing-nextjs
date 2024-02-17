import { Meta, StoryObj } from '@storybook/react';
import { userEvent, waitFor, within, expect } from '@storybook/test';

import { BasicLayoutDecorator, PCStory } from '@/tests/storybook';

import { PostForm } from './';

export default {
  component: PostForm,
  decorators: [BasicLayoutDecorator],
  parameters: {
    ...PCStory.parameters,
    nextRouter: {
      pathname: '/my/posts',
    },
  },
  args: {
    title: '新規記事',
    // description: '公開ステータスを変更するまで、記事は公開されません',
    onClickSave: () => {},
    onClickDelete: () => {},
  },
} satisfies Meta<typeof PostForm>;

type Story = StoryObj<typeof PostForm>;

export const Default: Story = {};

export const SucceedSaveAsDraft: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(
      canvas.getByRole('textbox', { name: '記事タイトル' }),
      '私の技術記事',
    );
  },
};

export const FailedSaveAsDraft: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(
      canvas.getByRole('button', { name: '下書き保存する' }),
    );
    const textbox = canvas.getByRole('textbox', { name: '記事タイトル' });
    await waitFor(() =>
      expect(textbox).toHaveErrorMessage('1文字以上入力してください'),
    );
  },
};

export const SavePublish: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(
      canvas.getByRole('textbox', { name: '記事タイトル' }),
      '私の技術記事',
    );
    await userEvent.click(
      canvas.getByRole('switch', { name: '公開ステータス' }),
    );
    await expect(
      canvas.getByRole('button', { name: '記事を公開する' }),
    ).toBeInTheDocument();
  },
};
