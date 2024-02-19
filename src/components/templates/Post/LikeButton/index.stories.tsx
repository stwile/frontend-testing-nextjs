import { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, waitFor, within } from '@storybook/test';

import * as LikeMock from '@/services/client/Like/__mock__/msw';
import { PCStory, SPStory, ToastProviderDecorator } from '@/tests/storybook';

import { LikeButton } from './';

export default {
  component: LikeButton,
  decorators: [ToastProviderDecorator],
  args: {
    likeCount: 0,
    liked: false,
    isMyPost: false,
    isLoggedIn: true,
  },
  parameters: {
    msw: {
      handlers: [...LikeMock.handlers],
    },
  },
} satisfies Meta<typeof LikeButton>;

type Story = StoryObj<typeof LikeButton>;

export const Default: Story = {};

export const Liked: Story = {
  args: {
    liked: true,
  },
  parameters: { ...PCStory.parameters },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');
    await expect(button).toBeDisabled();
  },
};

export const MyPost: Story = {
  args: {
    isMyPost: true,
  },
  parameters: { ...PCStory.parameters },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');
    await expect(button).toBeDisabled();
  },
};

export const UnLoggedIn: Story = {
  args: {
    isLoggedIn: false,
  },
  parameters: { ...PCStory.parameters },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');
    await expect(button).toBeDisabled();
  },
};

export const PushedLike: Story = {
  parameters: { ...PCStory.parameters },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const like = canvas.getByText('Like');
    await expect(like).toBeInTheDocument();

    const button = canvas.getByRole('button');
    await expect(button).toHaveTextContent('0');
    await expect(button).toBeEnabled();

    await userEvent.click(button);
    const liked = await canvas.findByText('Liked');
    await expect(liked).toBeInTheDocument();
    await expect(button).toHaveTextContent('1');
    await expect(button).toBeDisabled();
  },
};

export const RejectedLike: Story = {
  parameters: {
    ...PCStory.parameters,
    nextjs: {
      router: {
        query: {
          postId: 500,
        },
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const like = canvas.getByText('Like');
    await expect(like).toBeInTheDocument();

    const button = canvas.getByRole('button');
    await expect(button).toHaveTextContent('0');
    await expect(button).toBeEnabled();

    await userEvent.click(button);
    await expect(button).toHaveTextContent('0');
    await expect(button).not.toBeDisabled();

    await waitFor(async () => {
      const alert = canvas.getByRole('alert');
      await expect(alert).toHaveTextContent('エラーが発生しました');
    });
  },
};

export const SP: Story = { ...SPStory };
