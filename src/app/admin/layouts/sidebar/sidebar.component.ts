import {Component, Input, EventEmitter, OnInit, Output} from '@angular/core';
import {SharedService} from '../../../shared/shared.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  showSideBar: boolean;
  @Output() sendData = new EventEmitter();

  constructor(private sharedService: SharedService) {
    sharedService.showSideBar$.subscribe((res: boolean) => {
      this.showSideBar = res;
    });
  }

  ngOnInit(): void {
  }

  closeSideBar(): void {
    this.sharedService.setshowSideBarStatus(false);
  }

}
