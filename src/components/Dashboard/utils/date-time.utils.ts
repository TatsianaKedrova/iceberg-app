// import { ICalendarPredefinedOption } from '../../iceberg-calendar/interfaces/calendar-predefined-option';

export class DateTimeUtils {
  public static getDaysInMonth(year: number, month: number): number {
    return new Date(year, month + 1, 0).getDate();
  }

  // public static GetPredefinedChartPeriods(): ICalendarPredefinedOption[] {
  //   return [
  //     {
  //       nameToDisplay: '7D',
  //       dateRangeCalculationFunction: () => {
  //         const currentDate = new Date();
  //         const periodTo = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
  //         periodTo.setDate(currentDate.getDate() - 1);

  //         const periodFrom = new Date(periodTo);
  //         periodFrom.setDate(periodTo.getDate() - 6);
  //         return { periodFrom, periodTo };
  //       }
  //     },
  //     {
  //       nameToDisplay: '30D',
  //       dateRangeCalculationFunction: () => {
  //         const currentDate = new Date();
  //         const periodTo = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
  //         periodTo.setDate(currentDate.getDate() - 1);

  //         const periodFrom = new Date(periodTo);
  //         periodFrom.setDate(periodTo.getDate() - 29);
  //         return { periodFrom, periodTo };
  //       }
  //     },
  //     {
  //       nameToDisplay: 'MTD',
  //       dateRangeCalculationFunction: () => {
  //         const currentDate = new Date();
  //         const periodTo = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
  //         periodTo.setDate((currentDate.getDate() - 1) || 1);

  //         const periodFrom = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  //         return { periodFrom, periodTo };
  //       }
  //     },
  //     {
  //       nameToDisplay: '3M',
  //       dateRangeCalculationFunction: () => {
  //         const currentDate = new Date();
  //         const periodTo = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);

  //         const periodFrom = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  //         periodFrom.setMonth(currentDate.getMonth() - 3);

  //         return { periodFrom, periodTo };
  //       }
  //     },
  //     {
  //       nameToDisplay: '6M',
  //       dateRangeCalculationFunction: () => {
  //         const currentDate = new Date();
  //         const periodTo = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);

  //         const periodFrom = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  //         periodFrom.setMonth(currentDate.getMonth() - 6);

  //         return { periodFrom, periodTo };
  //       }
  //     },
  //   ];
  // }

  public static SetUtcTimezone(source: Date): Date {
    return new Date(
      Date.UTC(source.getFullYear(),
        source.getMonth(),
        source.getDate(),
        source.getHours(),
        source.getMinutes(),
        source.getSeconds(),
        source.getMilliseconds()));
  }

  public static GetIsDateValid(source: Date): boolean {
    return source instanceof Date && !isNaN(source.getTime());
  }

  public static GetMonthName(monthNumber: number): string {
    return [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'][monthNumber];
  }
}
