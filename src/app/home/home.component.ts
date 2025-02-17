import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  role: any;
  constructor(private sharedService: SharedService) {
    this.sharedService.role$.subscribe((val: number) => {
      this.role = val;
    });
   }

  ngOnInit(): void {
  }

}
