import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  token: string = sessionStorage.getItem('userId');

  // a simple verfication of the token in order to display/hide logout button
  loggedIn: boolean = this.token != null && this.token.length > 10;

  constructor(private client: HttpClient) { }

  login(email: string, password: string) {
    return this.client.get("http://localhost:8080/login/" + email + "/" + password + "/", { responseType: 'text' });
  }

  logout() {
    return this.client.get("http://localhost:8080/login/logout/" + this.token, { responseType: 'text' });
  }
  
}
