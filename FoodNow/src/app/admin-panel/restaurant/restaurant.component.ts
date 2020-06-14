import { RestaurantListComponent } from './../restaurant-list/restaurant-list.component';
import { MatDialog } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { UserService } from './../../shared/user.service';
import { Restaurant } from './../../shared/user.model';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit {

  constructor(private router: Router, public service: UserService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.resetForm();
    this.service.formData = {
      restaurantID: null,
      restaurantName: '',
      restaurantShortForm: '',
      Address: ''
    }
  }  

  onSubmit(form: NgForm) {
    if (form.value.restaurantID == null)
      this.insertRecord(form);
    else
      this.updateRecord(form);
  }

  insertRecord(form: NgForm) {
    this.service.postResturant(form.value).subscribe(res => {
      this.toastr.success("Submission Successful")
      this.resetForm(form);
      this.service.listOfRestaurants();
    });
  }

  updateRecord(form: NgForm) {
    this.service.putRestaurant(form.value).subscribe(res => {
      this.toastr.info("Updated")
      this.resetForm(form);
      this.service.listOfRestaurants();
    });
  }

}
