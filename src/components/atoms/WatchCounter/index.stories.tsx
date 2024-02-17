import { Meta, StoryObj } from '@storybook/react';
import { useForm } from 'react-hook-form';

import { Textbox } from '../Textbox';

import { WatchCounter } from './';

export function TestComponent({ text = '' }: { text?: string }) {
  const { register, control } = useForm({ defaultValues: { text } });
  const name = 'text';
  return (
    <>
      <Textbox {...register(name)} id="input" />
      <WatchCounter max={10} name={name} control={control} />
    </>
  );
}

export default {
  component: TestComponent,
  excludeStories: /.*Component$/,
  parameters: {
    a11y: {
      config: { rules: [{ id: 'label', enabled: false }] },
    },
  },
} satisfies Meta<typeof TestComponent>;

type Story = StoryObj<typeof TestComponent>;

export const Default: Story = {};

export const LimitOver: Story = {
  args: { text: '01234567890' },
};
