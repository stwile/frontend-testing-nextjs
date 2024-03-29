import { getPagination } from '@/lib/util/pagination';

import { CreateMyPostReturn, GetMyPostsReturn } from '../';

export const getMyPostsData: GetMyPostsReturn = {
  posts: [
    {
      id: 1,
      title: 'Frontend Testing Example',
      description: 'post example text.',
      body: 'post example text.',
      imageUrl: '/__mocks__/images/img01.jpg',
      published: true,
      authorId: 1,
      createdAt: new Date('2021-01-01T00:00:00.000Z'),
      updatedAt: new Date('2021-01-01T00:00:00.000Z'),
    },
    {
      id: 2,
      title: 'Frontend Testing Example',
      description: 'post example text.',
      body: 'post example text.',
      imageUrl: '/__mocks__/images/img02.jpg',
      published: true,
      authorId: 1,
      createdAt: new Date('2021-01-01T00:00:00.000Z'),
      updatedAt: new Date('2021-01-01T00:00:00.000Z'),
    },
    {
      id: 3,
      title: 'Frontend Testing Example',
      description: 'post example text.',
      body: 'post example text.',
      imageUrl: '/__mocks__/images/img03.jpg',
      published: false,
      authorId: 1,
      createdAt: new Date('2021-01-01T00:00:00.000Z'),
      updatedAt: new Date('2021-01-01T00:00:00.000Z'),
    },
    {
      id: 4,
      title: 'Frontend Testing Example',
      description: 'post example text.',
      body: 'post example text.',
      imageUrl: '/__mocks__/images/img04.jpg',
      published: true,
      authorId: 1,
      createdAt: new Date('2021-01-01T00:00:00.000Z'),
      updatedAt: new Date('2021-01-01T00:00:00.000Z'),
    },
    {
      id: 5,
      title: 'Frontend Testing Example',
      description: 'post example text.',
      body: 'post example text.',
      imageUrl: '/__mocks__/images/img05.jpg',
      published: true,
      authorId: 1,
      createdAt: new Date('2021-01-01T00:00:00.000Z'),
      updatedAt: new Date('2021-01-01T00:00:00.000Z'),
    },
    {
      id: 6,
      title: 'Frontend Testing Example',
      description: 'post example text.',
      body: 'post example text.',
      imageUrl: '/__mocks__/images/img06.jpg',
      published: true,
      authorId: 1,
      createdAt: new Date('2021-01-01T00:00:00.000Z'),
      updatedAt: new Date('2021-01-01T00:00:00.000Z'),
    },
    {
      id: 7,
      title: 'Frontend Testing Example',
      description: 'post example text.',
      body: 'post example text.',
      imageUrl: '/__mocks__/images/img07.jpg',
      published: true,
      authorId: 1,
      createdAt: new Date('2021-01-01T00:00:00.000Z'),
      updatedAt: new Date('2021-01-01T00:00:00.000Z'),
    },
  ],
  ...getPagination({
    take: 9,
    skip: 0,
    currentPage: 1,
    hitCount: 100,
  }),
};

export const getMyPostsEmptyData: GetMyPostsReturn = {
  posts: [],
  pagination: null,
  paginationInfo: { start: 0, end: 0, hitCount: 0 },
};

export const createMyPostsData: CreateMyPostReturn = {
  id: 1,
  title: 'Frontend Testing Example',
  description: 'post example text.',
  body: 'post example text.',
  imageUrl: '/__mocks__/images/img01.jpg',
  published: true,
  authorId: 1,
  createdAt: new Date('2021-01-01T00:00:00.000Z'),
  updatedAt: new Date('2021-01-01T00:00:00.000Z'),
};
