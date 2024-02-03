import { Meta, StoryObj } from '@storybook/react';
import { useForm } from 'react-hook-form';

import { PutInput } from '@/pages/api/my/posts/[postId]';

import { PostFormHeroImage } from './';

function TestComponent() {
  const {
    register,
    setValue,
    formState: { errors },
  } = useForm<PutInput>();
  return (
    <div style={{ display: 'flex', height: '120px' }}>
      <PostFormHeroImage
        register={register}
        setValue={setValue}
        name="imageUrl"
        error={errors.imageUrl?.message}
      />
    </div>
  );
}

export default {
  component: TestComponent,
} satisfies Meta<typeof PostFormHeroImage>;

type Story = StoryObj<typeof PostFormHeroImage>;

export const Default: Story = {};
