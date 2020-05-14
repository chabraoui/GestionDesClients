import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthClientService } from './../../services/auth-client.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
isloggedIn:boolean=false
userlogged:string;
  constructor(private authService : AuthClientService,
     private flash:FlashMessagesService,
     private route:Router) { }

  ngOnInit(): void {
    this.authService.getAuth().subscribe(auth =>{
      if(auth){
        this.isloggedIn=true;
this.userlogged=auth.email;
      }else{
        this.isloggedIn=false;
      }
    })
  }
onlogOut(){
this.authService.logOut();
this.flash.show("you are log out",{cssClass:'alert-warning',timeout:5000})
this.isloggedIn=false;
return this.route.navigate(['/login'])
}
}
