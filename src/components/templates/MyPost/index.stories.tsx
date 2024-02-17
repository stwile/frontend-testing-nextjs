import { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';

import { getMyPostData } from '@/services/server/MyPost/__mock__/fixture';
import { BasicLayoutDecorator, PCStory, SPStory } from '@/tests/storybook';

import { MyPost } from './';

export default {
  component: MyPost,
  args: { post: getMyPostData },
  decorators: [BasicLayoutDecorator],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const heading = canvas.getByRole('heading', {
      name: 'Frontend Testing Example',
    });

    /** 見出しの表示 */
    await expect(heading).toBeInTheDocument();

    const link = canvas.getByRole('link', {
      name: '編集する',
    });
    await userEvent.click(link);
    /** 「編集する」リンクを押下すると、編集ページに遷移する */
    await expect(link).toMatchObject({ pathname: '/my/posts/1/edit' });
  },
} satisfies Meta<typeof MyPost>;

type Story = StoryObj<typeof MyPost>;

export const Default: Story = { ...PCStory };

export const SP: Story = { ...SPStory };
