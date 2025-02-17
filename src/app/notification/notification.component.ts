import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  @Input() notShow: boolean;
  @Input() notError: boolean;
  @Input() notMessage: string;
  constructor() { }

  ngOnInit(): void {
  }

}
