import { AuthClientService } from './../../services/auth-client.service';
import {  FlashMessagesService } from 'angular2-flash-messages';
import { ClientService } from './../../services/client.service';
import { Client } from './../../model/model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {

  client: Client ={
    firstName: "",
    lastName: "",
    phone: null,
    email: "",
    balance: 0,
    user:""
  }

  constructor(private clientService : ClientService ,
     private route :Router,
     private authService:AuthClientService,
      private flashmsg : FlashMessagesService) { }

  ngOnInit(): void {
    this.authService.getAuth().subscribe(auth =>{
      this.client.user = auth.uid
    })
  } 
  onSubmit(){
    this.clientService.newClient(this.client)
    this.flashmsg.show('client add successefully', {cssClass:'alert-primary',timeout:5000})
    return this.route.navigate(['/']);
  }

}
