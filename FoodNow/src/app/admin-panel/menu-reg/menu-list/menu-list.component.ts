import { MatDialog } from '@angular/material/dialog';
import { Menus, MenuRes } from './../../../shared/user.model';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.css']
})
export class MenuListComponent implements OnInit {

  constructor(public service: UserService, private toastr: ToastrService, private router: Router,
    public dialog: MatDialog) { }

    openDialog() {
      const dialogRef = this.dialog.open(MenuComponent);
  
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    }
  

  ngOnInit() {
    this.service.listOfMenuRes();
    this.service.listOfRestaurants();
  }

  populateForm(i: MenuRes) {
    this.service.formMenuResData = Object.assign({}, i);
  }

  onDelete(id: number) {
    if (confirm('Do you confirm to delete this permanently?')) {
      this.service.deleteMenuRes(id).subscribe(menres => {
        this.service.listOfMenuRes();
        this.toastr.info('Deleted Successfully');
      });
    }
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
    if (form.value.restaurantID == null)
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
