import { Component, OnDestroy, OnInit } from '@angular/core';
import {LoadsService} from '../dashboard/loads.service';
import {environment} from '../../environments/environment';
import {SharedService} from '../shared/shared.service';
import {BranchesService} from '../admin/branches/branches.service';
import {Router} from '@angular/router';
import {CarriersService} from '../admin/carriers/carriers.service';
import {AdminsService} from '../admin/admins/admins.service';
import { map } from 'rxjs/operators';
import { timer } from 'rxjs';

@Component({
  selector: 'app-ap',
  templateUrl: './ap.component.html',
  styleUrls: ['./ap.component.css']
})
export class ApComponent implements OnInit, OnDestroy {
  backUrl: string;
  adminId: string;
  searchTD: boolean[];
  showHeadFilter: boolean;
  carriers: any;
  loads: any;
  search: any;
  admins: any;
  loadId: string;
  page: number;
  limit: number;
  total: number;
  role: number;

  showHeadeDropdown: boolean;
  showTrackBoard: boolean;
  sub : any;
  constructor(private loadsService: LoadsService,
              private sharedService: SharedService,
              private carriersService: CarriersService,
              private adminsService: AdminsService,
              private router: Router) {
    sharedService.showTrackBoard$.subscribe((val: boolean) => {
      this.showTrackBoard = val;
    });
    sharedService.role$.subscribe((val: number) => {
      this.role = val;
    });
  }

  ngOnInit(): void {
    this.showHeadeDropdown = false;
    this.showHeadFilter = true;
    this.searchTD = [false, false, false, false, false, false, false, false];
    this.backUrl = environment.apiUrl;
    this.page = 1;
    this.limit = 20;
    this.setSearchFilter();
    this.getLoads();
    this.getAdmins();
    this.sub = timer(0, 15*60*1000).pipe(
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
  getAdmins(): void {
    if (this.role !== 2) {
      this.adminsService.getAll().subscribe( (res: any) => {
        if (!res.error) {
          this.admins = res.data;
        }
      });
    }
  }
  getLoads(): void {
    this.sharedService.setLoader(true);
    this.sharedService.loadCreatedFunc(false);
    this.loadsService.getListAp(this.page, this.limit, this.search.payed, this.search).subscribe( (res: any) => {
      if (!res.error) {
        this.loads = res.data;
        this.total = res.total;
      }
      this.sharedService.setLoader(false);
    });
  }
  setSearchFilter(): void {
    this.search = {
      text: null,
      type: '',
      adminId: '',
      carrierId: '',
      payed: 0,
      dateMin: '',
      dateMax: '',
      sortBool: false,
      sortBy: '_id'
    };
  }

  searchCarrierFunc(e): void {
    this.carriersService.search({field: 'companyName', text: e.term}).subscribe( (res: any) => {
      if (!res.error) {
        this.carriers = res.data;
      }
    });
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

  currentpage(n: number): void {
    this.page = n;
    this.getLoads();
  }
  next(): void {
    this.page++;
    this.getLoads();
  }
  prev(): void {
    this.page--;
    this.getLoads();
  }

  logout(): void {
    localStorage.removeItem('admin');
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  save(load) {
    load.payedStatus = 1;
    load.end_date = null;
    load.amountOfPerncent = +(load.carrier_fee - ((load.carrier_fee * load.percent) / 100))
    console.log(load)
    this.loadsService.updateLoadAp(load).subscribe((res: any) => {
      this.notiFuncion(res);
    })
  }

  notiFuncion(data): void {
    this.sharedService.setnotShow(true);
    this.sharedService.setnotError(data.error);
    this.sharedService.setnotMessage(data.message);
    this.sharedService.setLoader(false);
    setTimeout(() => {
      this.sharedService.setnotShow(false);
      this.sharedService.setnotMessage('');
    }, 2500);
  }

}
