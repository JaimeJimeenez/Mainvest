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

  static isMonday(): boolean {
    return new Date().getDay() === 1;
  }

  static isTuesday(): boolean {
    return new Date().getDay() === 2;
  }

  static getToday(): string {
    const today = new Date();
    return this._parseDateToString(today);
  }

  static getYesterday(): string {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return this._parseDateToString(yesterday);
  }

  static getDayBefore(): string {
    const dayBefore = new Date();
    dayBefore.setDate(dayBefore.getDate() - 2);
    return this._parseDateToString(dayBefore);
  }

  static getYearBefore(): string {
    const yearBefore = new Date();
    yearBefore.setFullYear(yearBefore.getFullYear() - 1);
    return this._parseDateToString(yearBefore);
  }

  static getStringDate(date: string): string {
    return this._parseDateToString(new Date(date));
  }

  static getThursday(difference: number): string {
    const today = new Date();
    today.setDate(today.getDate() - difference);
    return this._parseDateToString(today);
  }

  static getFriday(difference: number): string {
    const today = new Date();
    today.setDate(today.getDate() - difference);
    return this._parseDateToString(today);
  }

  static getDay(difference: number): string {
    const today = new Date();
    today.setDate(today.getDate() - difference);
    return this._parseDateToString(today);
  }

}
