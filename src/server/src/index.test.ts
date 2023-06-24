import { add } from 'src/index';
import { describe, expect, it } from 'vitest';

describe('add', () => {
  it('returns 2', () => {
    const result = add(1, 1);

    expect(result).toBe(2);
  });
});
