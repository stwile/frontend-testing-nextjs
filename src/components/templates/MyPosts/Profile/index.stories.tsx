import { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';

import { getMyProfileData } from '@/services/server/MyProfile/__mock__/fixture';

import { Profile } from './';

export default {
  component: Profile,
  args: getMyProfileData,
} satisfies Meta<typeof Profile>;

type Story = StoryObj<typeof Profile>;

export const Default: Story = {
  args: getMyProfileData,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const region = canvas.getByRole('region', {
      name: 'プロフィール',
    });

    /** アクセシブルネーム「プロフィール」で識別できる */
    await expect(region).toBeInTheDocument();
    /** アクセシブルネーム「プロフィール」で識別できる */

    const link = canvas.getByRole('link', {
      name: '変更する',
    });
    /** 「変更する」リンクを押下すると画面遷移する */
    await userEvent.click(link);
    await expect(link).toMatchObject({
      pathname: '/my/profile/edit',
    });
    /** 「変更する」リンクを押下すると画面遷移する */
  },
};
