export class Time {

  private static _formatNumber(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }

  private static _parseDateToString(date: Date): string {
    const year = date.getFullYear();
    const month = this._formatNumber(date.getMonth() + 1);
    const day = this._formatNumber(date.getDate());
    return `${year}-${month}-${day}`;
  }

  static getToday(): string {
    const today = new Date();
    return this._parseDateToString(today);
  }

  static getYesterday(): string {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    return this._parseDateToString(yesterday);
  }

  static getDayBefore(): string {
    const today = new Date();
    const dayBefore = new Date();
    dayBefore.setDate(today.getDate() - 2);
    return this._parseDateToString(dayBefore);
  }

}
