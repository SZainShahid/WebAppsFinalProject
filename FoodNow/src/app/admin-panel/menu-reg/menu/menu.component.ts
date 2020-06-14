import { Menus } from './../../../shared/user.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/user.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private router: Router, public service: UserService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.resetForm();
    this.service.formMenuResData = {
      menuID: null,
      restaurantID: null,
      MenuItem: ''
    }
  }

  onSubmit(form: NgForm) {
    if (form.value.menuID == null)
      this.insertRecord(form);
    else
      this.updateRecord(form);
  }

  insertRecord(form: NgForm) {
    this.service.postMenuRes(form.value).subscribe(menres => {
      this.toastr.success("Submission Successful")
      this.resetForm(form);
      this.service.listOfMenuRes();
    });
  }

  updateRecord(form: NgForm) {
    this.service.putMenuRestaurant(form.value).subscribe(menres => {
      this.toastr.info("Updated")
      this.resetForm(form);
      this.service.listOfMenuRes();
    });
  }

}
