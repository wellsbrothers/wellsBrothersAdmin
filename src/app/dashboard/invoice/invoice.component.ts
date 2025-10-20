import { Component, Input, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { SettingsService } from '../../admin/settings/settings.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {

  @Input() load: any;
  // @Input() date: Date;

  private _date: Date | string | undefined;

  @Input()
  set date(value: Date | string | undefined) {
    console.log(value)
    if (!value) {
      const today = new Date();
      const day = String(today.getDate()).padStart(2, '0');
      const month = String(today.getMonth() + 1).padStart(2, '0'); // months are 0-based
      const year = today.getFullYear();
      this._date = `${month}-${day}-${year}`
      const plus30Days = new Date();
      plus30Days.setDate(today.getDate() + 30);
      this.dueDate = plus30Days;
    } else {
      this._date = value;
      this.dueDate
    }
  }

  get date(): Date | string | undefined {
    return this._date;
  }

  @Input() dueDate: Date | string;

  company: any;
  url: string;

  constructor(private settingsService: SettingsService) { }

  ngOnInit(): void {
    this.url = environment.apiUrl;
    this.settingsService.get().subscribe((res: any) => {
      if (!res.error) {
        this.company = res.data;
      }
    });
  }

  getSheeprName(id): any {
    return this.load.sheepersList ? this.load.sheepersList.filter(el => {
      return el._id === id;
    })[0] : null;
  }

  getConsName(id): any {
    return this.load.consigneesList ? this.load.consigneesList.filter(el => {
      return el._id === id;
    })[0] : null;
  }

  numberWithCommas(x): string {
    if (!x) { return ''; }
    const numParts = x.toString().split('.');
    numParts[0] = numParts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return numParts.join('.');
  }

  isDate(value: any): boolean {
    return value instanceof Date && !isNaN(value.getTime());
  }
}
