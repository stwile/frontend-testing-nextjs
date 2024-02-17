import { Meta, StoryObj } from '@storybook/react';
import { userEvent, waitFor, within, expect } from '@storybook/test';

import * as MyProfileMock from '@/services/client/MyProfile/__mock__/msw';
import * as MyProfileEditMock from '@/services/client/MyProfileEdit/__mock__/msw';
import { getMyProfileData } from '@/services/server/MyProfile/__mock__/fixture';
import { BasicLayoutDecorator, PCStory, SPStory } from '@/tests/storybook';

import { MyProfileEdit } from './';

export default {
  component: MyProfileEdit,
  args: {
    profile: getMyProfileData,
  },
  parameters: {
    msw: {
      handlers: [...MyProfileEditMock.handlers, ...MyProfileMock.handlers],
    },
  },
} satisfies Meta<typeof MyProfileEdit>;

type Story = StoryObj<typeof MyProfileEdit>;

const { parameters: PCParameter } = PCStory;
const { parameters: SPParameter } = SPStory;

const nextjsSetting = {
  router: {
    pathname: '/my/profile/edit',
  },
};

export const PCSuccess: Story = {
  decorators: [BasicLayoutDecorator],
  parameters: {
    ...PCParameter,
    nextjs: nextjsSetting,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const name = canvas.getByRole('textbox', {
      name: 'ユーザー名',
    });
    await waitFor(async () => {
      await userEvent.clear(name);
    });

    await waitFor(async () => {
      await userEvent.type(name, 'User.200');
    });

    const button = canvas.getByRole('button', {
      name: 'プロフィールを変更する',
    });
    await waitFor(async () => {
      await userEvent.click(button, { delay: 10 });
      const alert = canvas.getByRole('alert');
      await expect(alert).toHaveTextContent('保存に成功しました');
    });
  },
};

export const PCFail: Story = {
  decorators: [BasicLayoutDecorator],
  parameters: {
    ...PCParameter,
    nextjs: nextjsSetting,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const name = canvas.getByRole('textbox', {
      name: 'ユーザー名',
    });
    await waitFor(async () => {
      await userEvent.clear(name);
    });

    await waitFor(async () => {
      await userEvent.type(name, 'User.500');
    });

    const button = canvas.getByRole('button', {
      name: 'プロフィールを変更する',
    });
    await waitFor(async () => {
      await userEvent.click(button, { delay: 10 });
      const alert = canvas.getByRole('alert');
      await expect(alert).toHaveTextContent('保存に失敗しました');
    });
  },
};
export const SPSuccess: Story = {
  decorators: [BasicLayoutDecorator],
  parameters: {
    ...SPParameter,
    nextjs: nextjsSetting,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const name = canvas.getByRole('textbox', {
      name: 'ユーザー名',
    });
    await waitFor(async () => {
      await userEvent.clear(name);
    });

    await waitFor(async () => {
      await userEvent.type(name, 'User.200');
    });

    const button = canvas.getByRole('button', {
      name: 'プロフィールを変更する',
    });
    await waitFor(async () => {
      await userEvent.click(button, { delay: 10 });
      const alert = canvas.getByRole('alert');
      await expect(alert).toHaveTextContent('保存に成功しました');
    });
  },
};

export const SPFail: Story = {
  decorators: [BasicLayoutDecorator],
  parameters: {
    ...SPParameter,
    nextjs: nextjsSetting,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const name = canvas.getByRole('textbox', {
      name: 'ユーザー名',
    });
    await waitFor(async () => {
      await userEvent.clear(name);
    });

    await waitFor(async () => {
      await userEvent.type(name, 'User.500');
    });

    const button = canvas.getByRole('button', {
      name: 'プロフィールを変更する',
    });
    await waitFor(async () => {
      await userEvent.click(button, { delay: 10 });
      const alert = canvas.getByRole('alert');
      await expect(alert).toHaveTextContent('保存に失敗しました');
    });
  },
};
