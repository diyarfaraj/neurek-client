import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  model: any = {}

  constructor() { }

  ngOnInit(): void {
  }

  login(){
    console.log(this.model)
  }

}
