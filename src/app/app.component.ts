import {Component, OnInit, AfterViewInit, OnDestroy} from '@angular/core';
import {SharedService} from './shared/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy{
  title = 'goodfellas';
  notShow: boolean;
  notError: boolean;
  notMessage: string;
  loader: boolean;

  constructor(private sharedService: SharedService) {
    sharedService.notShow$.subscribe((val: boolean) => {
      this.notShow = val;
    });
    sharedService.loader$.subscribe((val: boolean) => {
      setTimeout(() => this.loader = val, 0);
    });
    sharedService.notError$.subscribe((val: boolean) => {
      this.notError = val;
    });
    sharedService.notMessage$.subscribe((val: string) => {
      this.notMessage = val;
    });
  }

  ngAfterViewInit(): void {

  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('admin');
    localStorage.clear();
  }

}
