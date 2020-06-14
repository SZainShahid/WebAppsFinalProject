import { ProfileComponent } from './../../profile/profile.component';
import { MenuComponent } from './menu/menu.component';
import { MatSliderModule } from '@angular/material/slider';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-menu-reg',
  templateUrl: './menu-reg.component.html',
  styleUrls: ['./menu-reg.component.css']
})
export class MenuRegComponent implements OnInit {

  constructor(private router: Router, public userService: UserService, public dialog: MatDialog) { }

  openDialog() {
    const dialogRef = this.dialog.open(ProfileComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  ngOnInit(): void {
  }

  LogOut() {
    localStorage.removeItem('userToken');
    this.router.navigate(['/signin']);
  }

}
