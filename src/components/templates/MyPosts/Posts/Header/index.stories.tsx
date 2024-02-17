import { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';

import { getMyPostsData } from '@/services/server/MyPosts/__mock__/fixture';

import { Header } from './';
export default {
  component: Header,
  args: getMyPostsData,
} satisfies Meta<typeof Header>;

type Story = StoryObj<typeof Header>;

export const Default: Story = {
  parameters: {
    nextjs: {
      router: {
        pathname: '/my/posts',
        query: {
          page: '1',
        },
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const combobox = canvas.getByRole('combobox', {
      name: '公開ステータス',
    });

    /** デフォルトでは「すべて」が選択されている */
    await expect(combobox).toHaveDisplayValue('すべて');
    /** デフォルトでは「すべて」が選択されている */

    await userEvent.selectOptions(combobox, '公開');
    await userEvent.selectOptions(combobox, '下書き');
  },
};

export const Public: Story = {
  parameters: {
    nextjs: {
      router: {
        pathname: '/my/posts',
        query: {
          status: 'public',
        },
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const combobox = canvas.getByRole('combobox', {
      name: '公開ステータス',
    });

    /** status?=public のアクセス場合「公開」が選択されている */
    await expect(combobox).toHaveDisplayValue('公開');
    /** status?=public のアクセス場合「公開」が選択されている */
  },
};

export const Private: Story = {
  parameters: {
    nextjs: {
      router: {
        pathname: '/my/posts',
        query: {
          status: 'private',
        },
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const combobox = canvas.getByRole('combobox', {
      name: '公開ステータス',
    });

    /** status?=public のアクセス場合「公開」が選択されている */
    await expect(combobox).toHaveDisplayValue('下書き');
    /** status?=public のアクセス場合「公開」が選択されている */
  },
};
