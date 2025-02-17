import { Component, Input, OnInit } from '@angular/core';
import { SettingsService } from '../../admin/settings/settings.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-bol',
  templateUrl: './bol.component.html',
  styleUrls: ['./bol.component.css'],
})
export class BolComponent implements OnInit {
  @Input() load: any;
  @Input() pdfPages: any;
  @Input() pdfCurrentPage: any;
  company: any;
  url: string;

  constructor(private settingsService: SettingsService) {}

  ngOnInit(): void {
    this.url = environment.apiUrl;
    this.settingsService.get().subscribe((res: any) => {
      if (!res.error) {
        this.company = res.data;
      }
    });
  }

  getSheeper(id): any {
    if (this.load.sheepersList && this.load.sheepersList.length) {
      return this.load.sheepersList.find((el) => el._id === id);
    }
  }

  getCons(id): any {
    if (this.load.consigneesList && this.load.consigneesList.length) {
      return this.load.consigneesList.find((el) => el._id === id);
    }
  }

  calculatedLinehaules() {
    var sum = 0;
    this.load.line_houles.forEach((element) => {
      sum += element.price;
    });
    return sum;
  }

  totalUnits() {
    var sum = 0;
    this.load.sheeper.forEach((element) => {
      sum += element.qty;
    });
    return sum;
  }

  totalWeight() {
    var sum = 0;
    this.load.sheeper.forEach((element) => {
      sum += element.weight;
    });
    return sum;
  }

  formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
  }
}
