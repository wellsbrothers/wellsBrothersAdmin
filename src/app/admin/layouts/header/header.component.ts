import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {SharedService} from '../../../shared/shared.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  showHeadeDropdown: boolean;
  showSideBar: boolean;
  showTrackBoard: boolean;
  constructor(private router: Router,
              private sharedService: SharedService) {
    sharedService.showSideBar$.subscribe((res: boolean) => {
      this.showSideBar = res;
    });
    sharedService.showTrackBoard$.subscribe((val: boolean) => {
      this.showTrackBoard = val;
    });
  }

  ngOnInit(): void {
    this.showHeadeDropdown = false;
    this.showSideBar = false;
  }

  logout(): void {
    localStorage.removeItem('admin');
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  onChanged(): void {
    this.showSideBar = !this.showSideBar;
    this.sharedService.setshowSideBarStatus(this.showSideBar);
  }

}
