import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  

  constructor(private router:Router, private dialog:MatDialog) {
    this.router = router;
    this.dialog = dialog;
}
ngOnInit() {
}
goToLogin() {
    this.router.navigate(['login']);
}
openLoginDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.maxHeight = '800px';
    dialogConfig.maxWidth = '600px';
    dialogConfig.restoreFocus = true;
    dialogConfig.autoFocus = true;
    const dialogRef = this.dialog.open(LoginComponent, dialogConfig);
}



}
