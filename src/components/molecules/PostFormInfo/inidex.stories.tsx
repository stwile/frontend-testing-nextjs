import { Meta, StoryObj } from '@storybook/react';
import { useForm } from 'react-hook-form';

import { PutInput } from '@/pages/api/my/posts/[postId]';

import { PostFormInfo } from './';

function TestComponent() {
  const {
    register,
    control,
    formState: { errors },
  } = useForm<PutInput>();
  return <PostFormInfo register={register} control={control} errors={errors} />;
}

export default {
  component: TestComponent,
} satisfies Meta<typeof PostFormInfo>;

type Story = StoryObj<typeof PostFormInfo>;

export const Default: Story = {};
