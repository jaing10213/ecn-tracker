import { ArrayLimiterPipe } from './array-limiter.pipe';

describe('ArrayLimiterPipe', () => {
  it('create an instance', () => {
    const pipe = new ArrayLimiterPipe();
    expect(pipe).toBeTruthy();
  });
});
