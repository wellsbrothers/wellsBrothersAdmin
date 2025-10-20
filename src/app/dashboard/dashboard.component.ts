import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { timer } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AdminsService } from '../admin/admins/admins.service';
import { BranchesService } from '../admin/branches/branches.service';
import { BrokersService } from '../admin/brokers/brokers.service';
import { CarriersService } from '../admin/carriers/carriers.service';
import { ConsigneesService } from '../admin/consignees/consignees.service';
import { SheepersService } from '../admin/sheepers/sheepers.service';
import { SharedService } from '../shared/shared.service';
import { ValidationsService } from '../validations/validations.service';
import { LoadsService } from './loads.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  backUrl: string;
  adminId: string;
  loadId: string;
  page: number;
  limit: number;
  total: number;
  sum: number;
  loadModal: any;
  repoertModal: any;
  mergeModal: boolean;
  showHeadeDropdown: boolean;
  creditCheckModal: boolean;
  carrierCheckModal: boolean;
  showHeadFilter: boolean;
  reportLoads: any;
  loads: any;
  load: any;
  search: any;
  mergedLoads: any;
  mergedValidateError: any;
  branches: any;
  admins: any;
  brokers: any;
  broker: any;
  carriers: any;
  carrier: any;
  carrierWithStatus: any;
  sheepers: any;
  sheeper: any;
  consignees: any;
  consignee: any;

  states: any;
  searchTD: any;
  searchBroker: any;
  searchCarrier: any;
  review: any;

  role: number;
  percentage: number;
  reportSumBrokerRate: number;
  reportSumCarrierFee: number;
  reportSumDifBrokerRateCarrierFee: number;
  reportSumDifBrokerRateCarrierFeePercentage: number;
  timer: any;
  sub: any;
  constructor(private sharedService: SharedService,
    private loadsService: LoadsService,
    private validationsService: ValidationsService,
    private brokersService: BrokersService,
    private consigneesService: ConsigneesService,
    private sheepersService: SheepersService,
    public el: ElementRef,
    private carriersService: CarriersService,
    private adminsService: AdminsService,
    private branchesService: BranchesService,
    private router: Router) {
    sharedService.role$.subscribe((val: number) => {
      this.role = val;
    });
    sharedService.getLoads$.subscribe((val: any) => {
      if (val) {
        this.getLoads();
      }
    });
    sharedService.percentage$.subscribe((val: number) => {
      this.percentage = val;
    });
    sharedService.getJSON().subscribe((res: any) => {
      this.states = res;
    });
  }
  ngOnInit(): void {
    this.adminId = JSON.parse(localStorage.getItem('admin'))._id,
      this.sharedService.role$.subscribe((val: number) => {
        this.role = val;
      });
    this.searchBroker = {
      text: '',
      type: 'searchWord'
    };
    this.searchCarrier = {
      text: '',
      type: 'searchWord'
    };
    this.sharedService.setModalAddOrEdtit({ add: true, loadId: '' });
    this.backUrl = environment.apiUrl;
    this.page = 1;
    this.limit = 20;

    this.repoertModal = false;
    this.creditCheckModal = false;
    this.carrierCheckModal = false;
    this.mergeModal = false;
    this.showHeadeDropdown = false;
    this.showHeadFilter = false;
    this.loadModal = {
      show: false
    };
    this.loads = [];
    this.searchTD = [false, false, false, false, false, false, false, false];
    this.setSearchFilter();
    this.getAdmins();
    this.getLoads(true);
    this.setergedLoads();

    this.sub = timer(0, 10 * 60 * 1000).pipe(
      map(() => {
        this.page = 1;
        this.getLoads(); // load data contains the http request
        this.sharedService.setLoader(false); // load data contains the http request
      })
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  searchBrokersStatus(): void {
    this.brokersService.searchBrokersStatus({ field: this.searchBroker.type, text: this.searchBroker.text }).subscribe((res: any) => {
      if (!res.error) {
        this.broker = res.data;
      }
    });
  }

  searchCarrierStatus(): void {
    this.carriersService.searchCarrierReview({ field: this.searchCarrier.type, text: this.searchCarrier.text }).subscribe((res: any) => {
      if (!res.error) {
        this.carrierWithStatus = res.data;
        if (!this.carrierWithStatus.review) {
          this.carrierWithStatus.review = {
            status: 'standard',
            message: '',
            createdBy: this.adminId
          };
        }
      }
    });
  }

  updatecarrierReview(): void {
    this.carriersService.updatecarrierReview(this.carrierWithStatus).subscribe((res: any) => {
      if (!res.error) {
        this.carrierWithStatus = res.data;
      }
    });
  }

  setergedLoads(): void {
    this.mergedLoads = [
      {
        loadNumber: null,
      },
      {
        loadNumber: null,
      }
    ];
    this.mergedValidateError = [false, false];
  }

  expoertExcel(): void {
    this.loadsService.expoertExcel(this.search).subscribe((res: any) => {
      if (!res.error) {
        const download = document.getElementById('downloadXlsx');
        download.click();
        // window.open(this.backUrl + '/xlsx/Excel.xlsx', '_target');
      }
    });
  }
  setSearchFilter(): void {
    this.search = {
      text: null,
      type: 'num',
      adminId: this.role === 2 ? JSON.parse(localStorage.getItem('admin'))._id : '',
      payed: '',
      dateMin: '',
      dateMax: '',
      sortBool: false,
      sortBy: 'createdAt'
    };
  }
  sort(index): void {
    for (let i = 0; i < this.searchTD.length; i++) {
      if (i === index) {
        this.searchTD[i] = !this.searchTD[i];
        this.search.sortBool = this.searchTD[i];
      } else {
        this.searchTD[i] = false;
      }
    }
    this.page = 1;
    this.getLoads();
  }

  getLoads(isFromInit = false): void {
    this.sharedService.setLoader(true);
    this.sharedService.loadCreatedFunc(false);

    if (isFromInit && !this.search.dateMin) {
      const firstDayOfCurrentMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1)
        .toISOString()
        .slice(0, 10);
      this.search.dateMin = firstDayOfCurrentMonth;
    }

    this.loadsService.getList(this.page, this.limit, this.search).subscribe((res: any) => {
      if (!res.error) {
        this.loads = res.data;
        this.total = res.total;
        this.sum = res.sum;
      }
      if (isFromInit) { this.search.dateMin = '' }
      this.sharedService.setLoader(false);
    });
  }

  getReport(): void {
    this.sharedService.setLoader(true);
    if (this.search.adminId && this.search.adminId != null &&
      this.search.dateMin && this.search.dateMin != null &&
      this.search.dateMax && this.search.dateMax != null) {
      this.loadsService.getReport({ adminId: this.search.adminId, dateMin: this.search.dateMin, dateMax: this.search.dateMax })
        .subscribe((res: any) => {
          if (!res.error) {
            this.reportSumBrokerRate = 0;
            this.reportSumCarrierFee = 0;
            this.reportSumDifBrokerRateCarrierFee = 0;
            this.reportSumDifBrokerRateCarrierFeePercentage = 0;
            this.reportLoads = res.data;
            this.repoertModal = true;
            this.reportLoads.forEach(el => {
              this.reportSumBrokerRate += el.broker_rate;
              this.reportSumCarrierFee += el.line_houles.reduce((calc, key) => calc + key.price, 0);
              this.reportSumDifBrokerRateCarrierFee += el.broker_rate - el.line_houles.reduce((calc, key) => calc + key.price, 0);
              this.reportSumDifBrokerRateCarrierFeePercentage += ((el.broker_rate - el.line_houles.reduce((calc, key) => calc + key.price, 0)) * el.admin[0].percentage) / 100;
            });
          }
        });
      this.sharedService.setLoader(false);
    } else {
      this.sharedService.setLoader(false);
      this.notiFuncion({ error: true, message: 'Please Choose Dispatcher, Date From And Date To' });
    }

  }

  getLineHoulesSum(lineHoules): number {
    return lineHoules.reduce((calc, key) => calc + key.price, 0);
  }

  notiFuncion(data): void {
    this.sharedService.setnotShow(true);
    this.sharedService.setnotError(data.error);
    this.sharedService.setnotMessage(data.message);
    this.sharedService.setLoader(false);
    setTimeout(() => {
      this.sharedService.setnotShow(false);
      this.sharedService.setnotMessage('');
    }, 3000);
  }

  numberWithCommas(): any {
    return this.sum.toLocaleString();
  }
  getAdmins(): void {
    if (this.role !== 2) {
      this.adminsService.getAll().subscribe((res: any) => {
        if (!res.error) {
          this.admins = res.data;
        }
      });
    }
  }
  addMergedLoad(): void {
    this.mergedLoads.push({ loadNumber: null });
    this.mergedValidateError.push(false);
  }
  removeMergedLoad(i): void {
    this.mergedLoads.splice(i, 1);
    this.mergedValidateError.splice(i, 1);
  }
  currentpage(n: number): void {
    this.page = n;
    this.getLoads(true);
  }
  next(): void {
    this.page++;
    this.getLoads(true);
  }
  prev(): void {
    this.page--;
    this.getLoads(true);
  }
  logout(): void {
    localStorage.removeItem('admin');
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
  getSheepName(obj, id): any {
    return obj.sheepersList.filter(el => {
      return el._id === id;
    })[0];
  }
  getConsName(obj, id): any {
    return obj.consigneesList.filter(el => {
      return el._id === id;
    })[0];
  }
  reportPdfFunc(): void {
    this.sharedService.setLoader(true);
    this.loadsService.reportPdf({
      html: document.getElementById('reportPdf').innerHTML,
      fullName: this.reportLoads[0].admin[0].fullName
    }).subscribe((res) => {
      if (!res.error) {
        const doc = document.getElementById('downloadReportPdf');
        doc.click();
        this.sharedService.setLoader(false);
        // window.open(this.backUrl + '/pdf/reportPdf.pdf');
      }
    });
  }

  pdfMergeLoad(): void {
    this.sharedService.setLoader(true);
    console.log(1, this.mergedValidateError);
    const loadNums = this.mergedLoads.map(a => a.loadNumber);
    const isNotEmpty = /\S+/;
    const isNumber = /^\d+$/;
    this.mergedLoads.forEach((el, ind) => {
      this.mergedValidateError[ind] = isNotEmpty.test(el.loadNumber) && !isNumber.test(el.loadNumber) && el.loadNumber !== 0;
    });

    if (this.mergedValidateError.indexOf(true) === -1) {
      this.loadsService.getListByLoadNumbers(loadNums).subscribe((res: any) => {
        if (!res.error) {
          console.log(res.data);
          if (res.data.length === 0) {
            this.sharedService.setLoader(false);
            this.notiFuncion({
              error: true,
              message: 'No Loads found'
            });
          } else {
            const response = res.data[0];
            response.carrier_fee = 0;
            res.data.forEach((el, ind) => {
              response.num += ind !== 0 ? (el.num + '_') : '_';
              if (ind !== 0) {
                response.sheeper = [...response.sheeper, ...el.sheeper];
                response.consignee = [...response.consignee, ...el.consignee];
                response.sheepersList = [...response.sheepersList, ...el.sheepersList];
                response.consigneesList = [...response.consigneesList, ...el.consigneesList];
                response.carrier_fee += el.carrier_fee;
              }
            });
            this.load = response;
            console.log(this.load);
            setTimeout(() => {
              this.loadsService.getRatePdf({ html: document.getElementById('pdfTable1').innerHTML, loadNum: this.load.num })
                .subscribe((resp: any) => {
                  if (!resp.error) {
                    const doc = document.getElementById('downloadRatePdf1');
                    doc.click();
                    this.sharedService.setLoader(false);
                    // window.open(this.backUrl + '/businesscard.pdf');
                  }
                });
            }, 1500);
          }
        } else {
          this.sharedService.setLoader(false);
          this.notiFuncion(res);
        }
      });
    }
  }

  sumOtherCharg(otherCharges): number {
    let sum = 0;
    otherCharges.forEach(el => {
      sum = sum + el.price;
    });
    return sum;
  }

  sumLineHaul(lineHauls) {
    let sum = 0;
    lineHauls.forEach(el => {
      sum = sum + el.price;
    });
    return sum;
  }
}
