import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  private _isWeekend() : boolean {
    const date = new Date();
    const today = date.getDay();
    return today === 0 || today === 6 || today === 5;
  }

  private _formatNumber(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }

  private _parseDateToString(date : Date) : string {
    const year = date.getFullYear();
    const month = this._formatNumber(date.getMonth() + 1);
    const day = this._formatNumber(date.getDate());

    return `${year}-${month}-${day}`;
  }

  private _getYesterdayAndToday() : { firstDay : string, lastDay : string } {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const firstDay = this._parseDateToString(yesterday);
    const lastDay = this._parseDateToString(today);
    return { firstDay, lastDay };
  }

  private _isMonday() : boolean {
    const today = new Date();
    return today.getDay() === 1;
  }

  getLastDays() : { firstDay : string, lastDay : string} {
    const date = new Date();
    const today = date.getDay();
    const difference = today === 0 ? 2 : 3;
    const friday = new Date(date);
    friday.setDate(date.getDate() - difference);
    const saturday = new Date(friday);
    saturday.setDate(friday.getDate() + 1);
    return { firstDay: this._parseDateToString(friday), lastDay: this._parseDateToString(saturday) };
  }

  getWeek() : { monday : string, saturday : string} {
    const date = new Date();
    const today = date.getDay();

    const monday = new Date(date);
    monday.setDate(date.getDate() - today + (today === 0 ? -6 : 1));

    const saturday = new Date(monday);
    saturday.setDate(monday.getDate() + 6);

    return { monday : this._parseDateToString(monday), saturday : this._parseDateToString(saturday) };
  }

  getDays() : { firstDay : string, lastDay : string } {
    return this._isWeekend() || this._isMonday() ? this.getLastDays() : this._getYesterdayAndToday();
  }

}
