export class Calendar{
  summerBeginning: Date;
  summerEnd: Date;
  winterBeginning: Date;
  winterEnd: Date;
  holidays: Date[];

  constructor() {

    this.summerBeginning = new Date();
    this.summerBeginning.setMonth(5);
    this.summerBeginning.setDate(20);

    this.summerEnd = new Date();
    this.summerEnd.setMonth(7);
    this.summerEnd.setDate(22);

    this.winterBeginning = new Date();
    this.winterBeginning.setMonth(11);
    this.winterBeginning.setDate(22);

    this.winterEnd = new Date();
    this.winterEnd.setMonth(2);
    this.winterEnd.setDate(20);

    this.holidays = [
      new Date(this.winterEnd.getFullYear(), 11, 25), // Christmas
      new Date(this.winterEnd.getFullYear(), 0, 1),   // New Year's Day
      new Date(this.winterEnd.getFullYear(), 0, 31),  // New Year's Eve
      new Date(this.winterEnd.getFullYear(), 4, 1),   // 1st May
      new Date(this.winterEnd.getFullYear(), 6, 23),  // 23rd July
    ];

  }
  isInSummerSeason(dateToCheck: Date): boolean {
    return dateToCheck >= this.summerBeginning && dateToCheck <= this.summerEnd;
  }

  isInWinterSeason(dateToCheck: Date): boolean {
    return dateToCheck >= this.winterBeginning && dateToCheck <= this.winterEnd;
  }
  private isSameDate(date1: Date, date2: Date): boolean {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }
  isHoliday(dateToCheck: Date): boolean {
    return this.holidays.some(holiday => this.isSameDate(holiday, dateToCheck));
  }

  }


