import { StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';

import * as MyPost from '@/services/client/MyPost/__mock__/msw';

import { MyPostEdit } from '.';

type Story = StoryObj<typeof MyPostEdit>;

export const publishSuccess: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    /** 「いいえ」を押下すると、AlertDialog が閉じる */
    const openPostsButton = canvas.getByRole('button', {
      name: '記事を公開する',
    });
    await userEvent.click(openPostsButton);

    const alertdialog = canvas.queryByRole('alertdialog');

    const noButton = canvas.getByRole('button', {
      name: 'いいえ',
    });
    await userEvent.click(noButton);

    await expect(alertdialog).not.toBeInTheDocument();
    /** 「いいえ」を押下すると、AlertDialog が閉じる */

    await userEvent.click(openPostsButton);
    const yesButton = canvas.getByRole('button', {
      name: 'はい',
    });
    await userEvent.click(yesButton, {
      delay: 100,
    });

    const alert = canvas.getByRole('alert');
    await expect(alert).toHaveTextContent('公開に成功しました');

    /** 不適正内容で送信を試みると、AlertDialog が閉じる */
    const title = canvas.getByRole('textbox', {
      name: '記事タイトル',
    });
    await userEvent.clear(title);

    await userEvent.click(openPostsButton);

    await userEvent.click(yesButton, {
      delay: 100,
    });
    await expect(alertdialog).not.toBeInTheDocument();
  },
};

export const publishFailure: Story = {
  parameters: {
    msw: {
      handlers: [
        MyPost.handlePutMyPost({
          status: 500,
        }),
      ],
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    /** 「いいえ」を押下すると、AlertDialog が閉じる */
    const openPostsButton = canvas.getByRole('button', {
      name: '記事を公開する',
    });
    await userEvent.click(openPostsButton);

    const yesButton = canvas.getByRole('button', {
      name: 'はい',
    });
    await userEvent.click(yesButton, {
      delay: 100,
    });
    const alert = canvas.getByRole('alert');
    await expect(alert).toHaveTextContent('公開に失敗しました');
  },
};

export const deleteSuccess: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const deleteButton = canvas.getByRole('button', {
      name: '記事を削除する',
    });
    await userEvent.click(deleteButton);

    const yesButton = canvas.getByRole('button', {
      name: 'はい',
    });
    await userEvent.click(yesButton, {
      delay: 100,
    });

    const alert = canvas.getByRole('alert');
    await expect(alert).toHaveTextContent('削除に成功しました');
  },
};

export const deleteFailure: Story = {
  parameters: {
    msw: {
      handlers: [
        MyPost.handlePutMyPost({
          status: 500,
        }),
      ],
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const deleteButton = canvas.getByRole('button', {
      name: '記事を削除する',
    });
    await userEvent.click(deleteButton);

    const yesButton = canvas.getByRole('button', {
      name: 'はい',
    });
    await userEvent.click(yesButton, {
      delay: 100,
    });

    const alert = canvas.getByRole('alert');
    await expect(alert).toHaveTextContent('削除に失敗しました');
  },
};
