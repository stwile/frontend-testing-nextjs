import { StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';

import { MyPostsCreate } from '.';

type Story = StoryObj<typeof MyPostsCreate>;

export const publishSuccess: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    /** 公開を試みた時、AlertDialog が表示される */
    const status = canvas.getByRole('switch', {
      name: '公開ステータス',
    });
    await userEvent.click(status);

    const openPostsButton = canvas.getByRole('button', {
      name: '記事を公開する',
    });
    await userEvent.click(openPostsButton);

    await canvas.findByRole('alertdialog');

    await expect(
      canvas.getByText('記事を公開します。よろしいですか？'),
    ).toBeInTheDocument();
    /** 公開を試みた時、AlertDialog が表示される */

    /** 「いいえ」を押下すると、AlertDialog が閉じる */
    await userEvent.click(openPostsButton);
    const noButton = canvas.getByRole('button', {
      name: 'いいえ',
    });
    await userEvent.click(noButton);

    await expect(canvas.queryByRole('alertdialog')).not.toBeInTheDocument();
    /** 「いいえ」を押下すると、AlertDialog が閉じる */

    /** 不適正内容で送信を試みると、AlertDialog が閉じる */
    await userEvent.click(openPostsButton);

    await canvas.findByRole('alertdialog');

    await expect(
      canvas.getByText('記事を公開します。よろしいですか？'),
    ).toBeInTheDocument();

    await userEvent.click(openPostsButton);
    const yesButton = canvas.getByRole('button', {
      name: 'はい',
    });
    await userEvent.click(yesButton);

    await expect(
      canvas.getByRole('textbox', {
        name: '記事タイトル',
      }),
    ).toBeInvalid();

    await expect(canvas.queryByRole('alertdialog')).not.toBeInTheDocument();
    /** 不適正内容で送信を試みると、AlertDialog が閉じる */

    /** API 通信を開始した時「保存中…」が表示される */
    const textbox = canvas.getByRole('textbox', {
      name: '記事タイトル',
    });
    await userEvent.type(textbox, '201');

    const fileName = 'hello.png';
    const content = 'hello';
    const uploadFile = new File([content], fileName, {
      type: 'image/png',
    });
    await userEvent.upload(canvas.getByTestId('file'), uploadFile, {});
    await userEvent.click(status);
    await userEvent.click(openPostsButton);
    await userEvent.click(yesButton);
  },
};
