import {Component, Input, OnInit} from '@angular/core';
import {SettingsService} from '../../admin/settings/settings.service';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
  @Input() load: any;
  company: any;
  url: string;
  date: Date;
  datePlusMonth: Date;

  constructor(private settingsService: SettingsService) { }

  ngOnInit(): void {
    this.date = new Date();
    console.log(this.date);
    this.datePlusMonth = new Date(new Date().setMonth(new Date().getMonth() + 1));
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
    return  this.load.consigneesList ? this.load.consigneesList.filter(el => {
      return el._id === id;
    })[0] : null;
  }

  numberWithCommas(x): string {
    const numParts = x.toString().split('.');
    numParts[0] = numParts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return numParts.join('.');
  }

}
