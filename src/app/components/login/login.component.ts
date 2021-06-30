import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder,  private service: LoginService,
    private router: Router, private dialogRef: MatDialogRef<LoginComponent>) { }

  loginForm: FormGroup;

  errorMessage: string;

  hide = true;

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  public login() {
    this.service.login(this.loginForm.controls['email'].value, this.loginForm.controls['password'].value).subscribe((token) => {
        sessionStorage.setItem('userId', token);
        this.service.loggedIn = true;
            this.router.navigate(["admin"]);
            this.dialogRef.close();
        }
      , (err) => {
        this.errorMessage = err.error;
        console.log(err.error);
      });
  }

  logout() {
    this.service.logout().subscribe((res) => {
      sessionStorage.removeItem('userId');
      this.service.loggedIn = false;
      alert(res);
      this.router.navigate(["main"]);
    }, (err) => {
      alert(err.error);
    })
  };

}
