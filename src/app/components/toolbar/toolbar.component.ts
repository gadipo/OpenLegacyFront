import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  
  constructor(public loginService:LoginService, private router:Router) { }
  
  ngOnInit(): void {
    console.log(this.loginService)
  }

  logout(){
    this.loginService.logout().subscribe((res)=>{
      sessionStorage.removeItem('userId');
      this.loginService.loggedIn = false;
      alert(res);
      this.router.navigate(["main"]);
    },(err)=>{
      alert(err.error);
    })
  };

}
