import { HttpError } from '@/lib/error';

import { createMyPostsData, getMyPostsData } from './fixture';
import * as MyPosts from '../';

jest.mock('../');

export function mockGetMyPostsResolved() {
  return jest.spyOn(MyPosts, 'getMyPosts').mockResolvedValue(getMyPostsData);
}

export function mockGetMyPostsRejected() {
  return jest
    .spyOn(MyPosts, 'getMyPosts')
    .mockRejectedValue(new HttpError(500).serialize());
}

export function mockCreateMyPostsResolved() {
  return jest
    .spyOn(MyPosts, 'createMyPost')
    .mockResolvedValue(createMyPostsData);
}

export function mockCreateMyPostsRejected() {
  return jest
    .spyOn(MyPosts, 'createMyPost')
    .mockRejectedValue(new HttpError(500).serialize());
}
