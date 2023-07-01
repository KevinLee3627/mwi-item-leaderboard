import { asyncHandler } from 'src/asyncHandler';

export const auth = asyncHandler(async (req, res, next) => {
  if (req.headers.token == null) {
    next(new Error('Missing token.'));
    return;
  }
  if (req.headers.token !== (process.env.API_TOKEN as string)) {
    next(new Error('Invalid/missing token.'));
    return;
  }

  next();
});
