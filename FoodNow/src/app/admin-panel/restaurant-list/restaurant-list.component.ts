import { MatDialog } from '@angular/material/dialog';
import { RestaurantComponent } from './../restaurant/restaurant.component';
import { NgForm } from '@angular/forms';
import { UserService } from './../../shared/user.service';
import { Component, OnInit } from '@angular/core';
import { Restaurant } from 'src/app/shared/user.model';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.css']
})
export class RestaurantListComponent implements OnInit {

  constructor(public service: UserService, private toastr: ToastrService, private router: Router,
    public dialog: MatDialog) { }

  panelOpenState = false;
  
  openDialog() {
    const dialogRef = this.dialog.open(RestaurantComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  ngOnInit() {
    this.service.listOfRestaurants();
  }

  populateForm(i: Restaurant) {
    this.service.formData = Object.assign({}, i);
  }

  onDelete(id: number) {
    if (confirm('Do you confirm to delete this permanently?')) {
      this.service.deleteRestaurant(id).subscribe(res => {
        this.service.listOfRestaurants();
        this.toastr.info('Deleted Successfully');
      });
    }
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
