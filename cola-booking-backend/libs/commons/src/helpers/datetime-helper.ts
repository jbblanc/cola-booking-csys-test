export class DateTimeHelper {
  static formatAsUtcForPostgres(date: Date): string {
    let strDate: string;
    strDate = this.formatYear(date) + '-';
    strDate += this.formatMonth(date) + '-';
    strDate += this.formatDay(date) + ' ';
    strDate += this.formatHours(date) + ':';
    strDate += this.formatMinutes(date) + ':';
    strDate += this.formatSeconds(date) + '.';
    strDate += this.formatMilliseconds(date);
    return strDate;
  }

  static formatYear(date: Date): string {
    return date.getUTCFullYear().toString();
  }

  static formatMonth(date: Date): string {
    return (date.getUTCMonth() < 9 ? '0' : '') + (date.getUTCMonth() + 1);
  }

  static formatDay(date: Date): string {
    return this.addAnyZero(date.getUTCDate());
  }

  static formatMinutes(date: Date): string {
    return this.addAnyZero(date.getUTCMinutes());
  }

  static formatHours(date: Date): string {
    return this.addAnyZero(date.getUTCHours());
  }

  static formatSeconds(date: Date): string {
    return this.addAnyZero(date.getUTCSeconds());
  }

  static formatMilliseconds(date: Date): string {
    return this.addAnyZero(date.getUTCMilliseconds());
  }

  static addAnyZero(value: number): string {
    return (value < 10 ? '0' : '') + value;
  }

  static getUniqueMonth(date: Date): number {
    if (date) {
      return date.getFullYear() * 100 + date.getMonth() + 1;
    } else {
      const currentDay = new Date();
      return currentDay.getFullYear() * 100 + currentDay.getMonth() + 1;
    }
  }

  static getMonthStartTimestamp(month: number): number {
    const yearStr = month.toString().substring(0, 3);
    const monthStr = month.toString().substring(0, 3);

    return new Date(yearStr + '-' + monthStr + '-01T00:00:00').getTime();
  }

  static getMonthEndTimestamp(month: number): number {
    const yearStr = month.toString().substring(0, 4);
    const monthStr = month.toString().substring(4);
    let dayStr = '30';
    if (monthStr === '02') {
      const year: number = parseInt(monthStr);
      dayStr =
        year % 4 !== 0 || (year % 100 === 0 && year % 400 !== 0) ? '28' : '29';
    } else if (['01', '03', '05', '07', '08', '10', '12'].includes(monthStr)) {
      dayStr = '31';
    }
    return new Date(
      yearStr + '-' + monthStr + '-' + dayStr + 'T23:59:59',
    ).getTime();
  }

  static getHourStart(day: Date) {
    day.setMinutes(0);
    day.setSeconds(0);
    day.setMilliseconds(0);
    return day;
  }

  static getDayStart(day: Date) {
    day.setHours(0);
    day.setMinutes(0);
    day.setSeconds(0);
    day.setMilliseconds(0);
    return day;
  }

  static getDayEnd(day: Date) {
    day.setHours(23);
    day.setMinutes(59);
    day.setSeconds(59);
    day.setMilliseconds(999);
    return day;
  }
}
