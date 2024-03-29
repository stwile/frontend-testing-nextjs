import { z } from 'zod';

import { ApiHandler, handleNotAllowed, withLogin } from '@/lib/next/api';
import { validate } from '@/lib/util';
import { postLike, PostLikeReturn } from '@/services/server/Like';

export type PostReturn = PostLikeReturn;

// eslint-disable-next-line @typescript-eslint/no-misused-promises
const handlePost = withLogin<PostReturn>(async (req, res) => {
  validate(req.body, z.object({ postId: z.number() }));
  const data = await postLike({
    userId: req.user.id,
    postId: req.body.postId,
  });
  res.status(201).json(data);
});

const handler: ApiHandler<PostReturn> = async (req, res) => {
  switch (req.method) {
    case 'POST':
      return handlePost(req, res);
    default:
      return handleNotAllowed(res);
  }
};

export default handler;
