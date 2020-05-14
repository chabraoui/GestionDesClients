import { Client } from './../../model/model';
import { Component, OnInit } from '@angular/core';
import {  FlashMessagesService } from 'angular2-flash-messages';
import { ClientService } from './../../services/client.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {
  id:string

  client : Client = {
    firstName: '',
    lastName: '',
    phone: null,
    email: '',
    balance: 0
  };

  constructor(
    private clientService : ClientService ,
    private route :ActivatedRoute,
    private routes : Router,
    private flashmsg : FlashMessagesService
  ) { }

  ngOnInit(): void {
    this.id =this.route.snapshot.params['id'];
    this.clientService.getoneclient(this.id).subscribe(client => {
      this.client = client;
      console.log(this.client)
    });
  }
 editeclient(){
    this.client.id=this.id;
    this.clientService.updateBalance(this.client);
    this.flashmsg.show('client Updated', {cssClass:'alert-success', timeout:3000})
    this.routes.navigate(['/clients/',this.id])
  }

}
