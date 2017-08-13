import { CommentSorterPipe } from './comment-sorter.pipe';

describe('CommentSorterPipe', () => {
  it('create an instance', () => {
    const pipe = new CommentSorterPipe();
    expect(pipe).toBeTruthy();
  });
});
