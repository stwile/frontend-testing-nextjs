import { Meta, StoryObj } from '@storybook/react';
import { userEvent, within, expect } from '@storybook/test';

import { handleGetMyProfile } from '@/services/client/MyProfile/__mock__/msw';
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
    msw: {
      handler: [handleGetMyProfile()],
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
    const textbox = canvas.getByRole('textbox', {
      name: '記事タイトル',
    });
    await userEvent.type(textbox, '私の技術記事');
  },
};

export const FailedSaveAsDraft: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', {
      name: '下書き保存する',
    });
    await userEvent.click(button);
    const textbox = canvas.getByRole('textbox', {
      name: '記事タイトル',
    });
    await expect(textbox).toHaveAccessibleErrorMessage(
      '1文字以上入力してください',
    );
  },
};

export const SavePublish: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const textbox = canvas.getByRole('textbox', {
      name: '記事タイトル',
    });
    await userEvent.type(textbox, '私の技術記事');

    const statusToggle = canvas.getByRole('switch', {
      name: '公開ステータス',
    });
    await userEvent.click(statusToggle);

    const button = canvas.getByRole('button', {
      name: '記事を公開する',
    });
    await expect(button).toBeInTheDocument();
  },
};
