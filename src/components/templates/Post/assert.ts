import { StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { Post } from '.';

type Story = StoryObj<typeof Post>;

export const checkDisplay: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const heading = canvas.getByRole('heading', {
      name: 'Frontend Testing Example',
    });

    await expect(heading).toBeInTheDocument();

    const button = canvas.getByRole('button', {
      name: 'Like',
    });
    await expect(button).toBeInTheDocument();
  },
};
