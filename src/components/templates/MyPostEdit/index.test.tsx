import { composeStories } from '@storybook/react';
import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import mockRouter from 'next-router-mock';

import * as MyPost from '@/services/client/MyPost/__mock__/msw';
import * as MyProfile from '@/services/client/MyProfile/__mock__/msw';
import { setupMockServer } from '@/tests/jest';

import * as stories from './index.stories';

const { Default } = composeStories(stories);
const user = userEvent.setup();

function setup() {
  render(<Default />);
  async function clearTitle() {
    await act(() =>
      user.clear(screen.getByRole('textbox', { name: '記事タイトル' })),
    );
  }
  async function saveAsPublished() {
    await act(() =>
      user.click(screen.getByRole('button', { name: '記事を公開する' })),
    );
    await screen.findByRole('alertdialog');
  }
  async function saveAsDraft() {
    await act(() =>
      user.click(screen.getByRole('switch', { name: '公開ステータス' })),
    );
    await act(() =>
      user.click(screen.getByRole('button', { name: '下書き保存する' })),
    );
  }
  async function deletePost() {
    await act(() =>
      user.click(screen.getByRole('button', { name: '記事を削除する' })),
    );
  }
  async function clickButton(name: 'はい' | 'いいえ') {
    await act(() => user.click(screen.getByRole('button', { name })));
  }
  return {
    clearTitle,
    saveAsPublished,
    saveAsDraft,
    deletePost,
    clickButton,
  };
}

const server = setupMockServer(...MyPost.handlers, ...MyProfile.handlers);
beforeEach(() => {
  mockRouter.setCurrentUrl('/my/posts/200/edit');
});

describe('AlertDialog', () => {
  test('「いいえ」を押下すると、AlertDialog が閉じる', async () => {
    const { saveAsPublished, clickButton } = setup();
    await saveAsPublished();
    await clickButton('いいえ');
    expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument();
  });

  test('不適正内容で送信を試みると、AlertDialog が閉じる', async () => {
    const { clearTitle, saveAsPublished, clickButton } = setup();
    await clearTitle();
    await saveAsPublished();
    await clickButton('はい');
    await waitFor(() =>
      expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument(),
    );
  });
});

describe('Toast', () => {
  test('公開に成功した場合「公開に成功しました」が表示される', async () => {
    const { saveAsPublished, clickButton } = setup();
    await saveAsPublished();
    await clickButton('はい');
    await waitFor(() =>
      expect(screen.getByRole('alert')).toHaveTextContent('公開に成功しました'),
    );
  });

  test('公開に失敗した場合「公開に失敗しました」が表示される', async () => {
    server.use(MyPost.handlePutMyPost({ status: 500 }));
    const { saveAsPublished, clickButton } = setup();
    await saveAsPublished();
    await clickButton('はい');
    await waitFor(() =>
      expect(screen.getByRole('alert')).toHaveTextContent('公開に失敗しました'),
    );
  });

  test('削除に成功した場合「削除に成功しました」が表示される', async () => {
    const { deletePost, clickButton } = setup();
    await deletePost();
    await clickButton('はい');
    await waitFor(() =>
      expect(screen.getByRole('alert')).toHaveTextContent('削除に成功しました'),
    );
  });

  test('削除に失敗した場合「削除に失敗しました」が表示される', async () => {
    server.use(MyPost.handleDeleteMyPost({ status: 500 }));
    const { deletePost, clickButton } = setup();
    await deletePost();
    await clickButton('はい');
    await waitFor(() =>
      expect(screen.getByRole('alert')).toHaveTextContent('削除に失敗しました'),
    );
  });
});

describe('画面遷移', () => {
  test('公開に成功した場合、画面遷移する', async () => {
    const { saveAsPublished, clickButton } = setup();
    await saveAsPublished();
    await clickButton('はい');
    await waitFor(() =>
      expect(mockRouter).toMatchObject({ pathname: '/my/posts/1' }),
    );
  });

  test('削除に成功した場合、画面遷移する', async () => {
    const { deletePost, clickButton } = setup();
    await deletePost();
    await clickButton('はい');
    await waitFor(() =>
      expect(mockRouter).toMatchObject({ pathname: '/my/posts' }),
    );
  });
});
