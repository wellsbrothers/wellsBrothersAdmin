import { Component, OnInit } from '@angular/core';
import {SharedService} from '../shared/shared.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  showSideBar: boolean;
  constructor(private sharedService: SharedService) {
    sharedService.showSideBar$.subscribe((res: boolean) => {
      this.showSideBar = res;
    });
  }

  ngOnInit(): void {
    this.showSideBar = false;
  }

}
