import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  
  baseUrl = 'http://localhost:56340/api/';

  constructor(private http: HttpClient) { }

  state = {
loggedIn :false,
  }

  login(model:any){
    this.state.loggedIn = true;
return this.http.post(this.baseUrl + 'account/login', model);
  }
  
  logout() {
    localStorage.removeItem('user');
   
  }
}
