import { DateFormatterPipe } from '../src/app/core/pipe/date-formatter.pipe';

describe('DateFormatterPipe', () => {
  it('create an instance', () => {
    const pipe = new DateFormatterPipe();
    expect(pipe).toBeTruthy();
  });
});
