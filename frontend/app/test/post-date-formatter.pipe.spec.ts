import { PostDateFormatterPipe } from '../src/app/core/pipe/post-date-formatter.pipe';

describe('PostDateFormatterPipe', () => {
  it('create an instance', () => {
    const pipe = new PostDateFormatterPipe();
    expect(pipe).toBeTruthy();
  });
});
