import { Component, OnInit, ViewChild } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { NavComponent } from '../nav/nav.component';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
 

  model: any = {}
  loggedIn: boolean = false;

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    this.getCurrentUser();
  }

//TODO: set current user in persistence
  login(){
    this.accountService.login(this.model).subscribe(response => {
      console.log(response);
      this.loggedIn = true;
    
    }, error => {
      console.log(error);
    })
  }

  logout() {
    this.accountService.logout();
    this.loggedIn = false;
  }

  getCurrentUser(){
    this.accountService.currentUser$.subscribe(user => {
      console.log(user, "HEHEHEHEHEHEHEHE");
      this.loggedIn = !!user;
    }, error => {
      console.log(error);
    })
  }

}
