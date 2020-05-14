import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthClientService } from './../../services/auth-client.service';
import { Component, OnInit } from '@angular/core';
import {  catchError } from 'rxjs/operators';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
email:string;
password:string;
  constructor(private authService:AuthClientService,
     private flash:FlashMessagesService,
     private route:Router) { }

  ngOnInit(): void {
    this.authService.getAuth().subscribe(auth =>{
      if(auth)
      return this.route.navigate(['/'])
    })
    
  }
onlogin(){
  this.authService.login(this.email,this.password)
  .then(auth => {
    if(auth){
this.flash.show('You are Logged successefully',{ cssClass:"alert-success",timeout:5000})
this.route.navigate(['/'])
    }
    })
    .catch(error => {
      this.flash.show(error.message,{ cssClass:"alert-danger",timeout:5000})
    })
}

onloginwithgoole(){
  this.authService.loginWithGoogle()
  .then(auth => {
    if(auth){
this.flash.show('You are Logged successefully',{ cssClass:"alert-success",timeout:5000})
this.route.navigate(['/'])
    }
    })
    .catch(error => {
      this.flash.show(error.message,{ cssClass:"alert-danger",timeout:5000})
    })
}

}
