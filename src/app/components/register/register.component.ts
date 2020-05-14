import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthClientService } from './../../services/auth-client.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
email:string;
password:string;
  constructor(private authservice:AuthClientService,
    private routes:Router,
    private falsh:FlashMessagesService) { }

  ngOnInit(): void {
  }
onRegistre(){
this.authservice.Register(this.email,this.password)
.then(register =>{
if(register){
this.falsh.show('Congratulation, you are sign-up',{cssClass:'alert-success',timeout:3000})
this.routes.navigate(['/'])
}
}).catch(error =>{
  this.falsh.show(error.message,{cssClass:'alert-danger',timeout:3000})
})
}
}
