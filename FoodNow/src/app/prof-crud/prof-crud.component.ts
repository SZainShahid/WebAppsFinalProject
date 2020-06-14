import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-prof-crud',
  templateUrl: './prof-crud.component.html',
  styleUrls: ['./prof-crud.component.css']
})
export class ProfCrudComponent implements OnInit {
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

  constructor(private router: Router, public userService: UserService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  LogOut() {
    localStorage.removeItem('userToken');
    this.router.navigate(['/signin']);
  }

  onSubmit(form: NgForm) {
  }
}
