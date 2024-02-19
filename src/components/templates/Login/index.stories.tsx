import { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';

import { Input } from '@/services/client/Login';
import * as LoginMsw from '@/services/client/Login/__mock__/msw';
import { handleGetMyProfile } from '@/services/client/MyProfile/__mock__/msw';
import * as MyProfile from '@/services/client/MyProfile/__mock__/msw';
import { BasicLayoutDecorator, PCStory, SPStory } from '@/tests/storybook';

import { Login } from './';

export default {
  component: Login,
  parameters: {
    nextRouter: { pathname: '/login' },
    nextjs: {
      router: {
        pathname: '/login',
      },
    },
    msw: {
      handlers: [
        handleGetMyProfile({
          status: 401,
        }),
        ...LoginMsw.handlers,
        ...MyProfile.handlers,
      ],
    },
  },
  decorators: [BasicLayoutDecorator],
} satisfies Meta<typeof Login>;

type Story = StoryObj<typeof Login>;

export const Default: Story = {
  ...PCStory,
};

export const FailureLogin: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const input: Input = {
      email: '500@example.com',
      password: 'abcd1234',
    };

    const email = canvas.getByRole('textbox', {
      name: 'メールアドレス',
    });
    const password = canvas.getByPlaceholderText('8文字以上で入力');
    const button = canvas.getByRole('button', {
      name: 'ログイン',
    });
    await userEvent.type(email, input.email);
    await userEvent.type(password, input.password);
    await userEvent.click(button);

    const alert = await canvas.findByRole('alert');
    await expect(alert).toHaveTextContent('ログインに失敗しました');
  },
};
export const FailureValidation: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const input: Input = {
      email: 'test',
      password: '1234',
    };

    const email = canvas.getByRole('textbox', {
      name: 'メールアドレス',
    });
    const password = canvas.getByPlaceholderText('8文字以上で入力');
    const button = canvas.getByRole('button', {
      name: 'ログイン',
    });
    await userEvent.type(email, input.email);
    await userEvent.type(password, input.password);
    await userEvent.click(button);

    await expect(email).toHaveAccessibleErrorMessage(
      '不正なメールアドレス形式です',
    ),
      await expect(password).toHaveAccessibleErrorMessage(
        '8文字以上で入力してください',
      );
  },
};

export const SP: Story = { ...SPStory };
