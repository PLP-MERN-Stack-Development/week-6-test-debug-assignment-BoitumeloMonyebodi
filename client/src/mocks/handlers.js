import { rest } from 'msw';

const API_BASE = 'http://localhost:5055/api/bugs';

export const handlers = [
  rest.get(API_BASE, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        { _id: '1', title: 'Bug 1', description: 'Description 1' },
        { _id: '2', title: 'Bug 2', description: 'Description 2' },
      ])
    );
  }),

  rest.post(API_BASE, (req, res, ctx) => {
    return res(
      ctx.status(201),
      ctx.json({ _id: '3', ...req.body })
    );
  }),
];