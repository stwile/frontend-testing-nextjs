import { Meta, StoryObj } from '@storybook/react';

import {
  BadRequestError,
  InternalServerError,
  MethodNotAllowedError,
  NotFoundError,
  UnauthorizedError,
} from '@/lib/error';
import { BasicLayoutDecorator, PCStory, SPStory } from '@/tests/storybook';

import { Error } from './';

export default {
  component: Error,
  decorators: [BasicLayoutDecorator],
  parameters: {
    ...PCStory.parameters,
  },
} satisfies Meta<typeof Error>;

type Story = StoryObj<typeof Error>;

export const BadRequest: Story = {
  args: new BadRequestError().serialize(),
};

export const Unauthorized: Story = {
  args: new UnauthorizedError().serialize(),
};

export const NotFound: Story = {
  args: new NotFoundError().serialize(),
};

export const MethodNotAllowed: Story = {
  args: new MethodNotAllowedError().serialize(),
};

export const InternalServer: Story = {
  args: new InternalServerError().serialize(),
};

export const SP: Story = {
  ...BadRequest,
  parameters: {
    ...SPStory.parameters,
  },
};
