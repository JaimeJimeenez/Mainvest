import { Injectable } from '@angular/core';
import { Time } from 'lightweight-charts';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  private _isWeekend() : boolean {
    const date = new Date();
    const today = date.getDay();
    return today === 0 || today === 6;
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

  private _getFridayAndSaturdayLastWeek(date: Date): { firstDay: string, lastDay: string } {
    const fridayLastWeek = new Date(date);
    fridayLastWeek.setDate(date.getDate() - (date.getDay() === 1 ? 4 : 3));

    const saturdayLastWeek = new Date(fridayLastWeek);
    saturdayLastWeek.setDate(fridayLastWeek.getDate() + 1);

    return { firstDay: this._parseDateToString(fridayLastWeek), lastDay: this._parseDateToString(saturdayLastWeek) };
  }

  private _getDayBeforeAndYesterday(date: Date): { firstDay: string, lastDay: string } {
    const yesterday = new Date(date);

    const dayBeforeYesterday = new Date(yesterday);
    dayBeforeYesterday.setDate(yesterday.getDate() - 1);

    return { firstDay: this._parseDateToString(dayBeforeYesterday), lastDay: this._parseDateToString(yesterday) };
  }

  getOlderDays(): { firstDay: string, lastDay: string } {
    const date = new Date();
    const yesterday = new Date(date);
    yesterday.setDate(date.getDate() - 1);

    if (yesterday.getDay() === 1 || yesterday.getDay() === 6) {
      return this._getFridayAndSaturdayLastWeek(yesterday);
    } else {
      return this._getDayBeforeAndYesterday(yesterday);
    }
  }

  getMonths() : { pastMonth : string, actualMonth : string } {
    const today = new Date();
    const past = new Date(today);

    past.setMonth(past.getMonth() - 1);

    return { pastMonth: this._parseDateToString(past), actualMonth: this._parseDateToString(today) };
  }

  getYears() : { pastYear : string, actualYear : string } {
    const today = new Date();
    const past = new Date(today);

    past.setFullYear(past.getFullYear() - 1 )
    return { pastYear : this._parseDateToString(past), actualYear : this._parseDateToString(today) };
  }

  parseDate(dateString: string): string {
    const date = new Date(dateString);

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;

    return formattedDate;
  }

  getPredictedDate() : { firstDate : string, lastDate : string } {
    const today = new Date();
    const pastDate = new Date(today);

    pastDate.setFullYear(pastDate.getFullYear() - 4);

    return { firstDate: this._parseDateToString(pastDate), lastDate: this._parseDateToString(today) }
  }
}
