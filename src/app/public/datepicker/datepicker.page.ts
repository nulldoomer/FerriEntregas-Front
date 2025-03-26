// // src/app/datepicker/datepicker.component.ts
// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-datepicker',
//   templateUrl: './datepicker.page.html',
//   styleUrls: ['./datepicker.page.css'],
//   standalone: false
// })
// export class DatepickerPage {
//   showDatepicker = false;
//   datepickerValue: string = '';
//   month: number;
//   year: number;
//   no_of_days: number[] = [];
//   blankdays: number[] = [];
//   days: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
//   monthNames: string[] = [
//     'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 
//     'October', 'November', 'December'
//   ];

//   constructor() {
//     const today = new Date();
//     this.month = today.getMonth();
//     this.year = today.getFullYear();
//     this.datepickerValue = today.toDateString();
//     this.getNoOfDays();
//   }

//   toggleDatepicker() {
//     this.showDatepicker = !this.showDatepicker;
//   }

//   closeDatepicker() {
//     this.showDatepicker = false;
//   }

//   changeMonth(direction: number) {
//     this.month += direction;
//     if (this.month < 0) {
//       this.month = 11;
//       this.year--;
//     } else if (this.month > 11) {
//       this.month = 0;
//       this.year++;
//     }
//     this.getNoOfDays();
//   }

//   getNoOfDays() {
//     const daysInMonth = new Date(this.year, this.month + 1, 0).getDate();
//     const dayOfWeek = new Date(this.year, this.month).getDay();
    
//     this.blankdays = Array(dayOfWeek).fill(0);
//     this.no_of_days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
//   }

//   selectDate(date: number) {
//     const selectedDate = new Date(this.year, this.month, date);
//     this.datepickerValue = selectedDate.toDateString();
//     this.showDatepicker = false;
//   }

//   isToday(date: number): boolean {
//     const today = new Date();
//     const currentDate = new Date(this.year, this.month, date);
//     return today.toDateString() === currentDate.toDateString();
//   }
// }
