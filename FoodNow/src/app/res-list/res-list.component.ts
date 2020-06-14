import { UserService } from './../shared/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-res-list',
  templateUrl: './res-list.component.html',
  styleUrls: ['./res-list.component.css']
})
export class ResListComponent implements OnInit {

  constructor(public service: UserService) { }

  ngOnInit(): void {
    this.service.listOfRestaurants();
    this.service.listOfMenuRes();
  }
}

