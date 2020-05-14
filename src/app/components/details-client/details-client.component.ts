import { Component, OnInit } from '@angular/core';
import {  FlashMessagesService } from 'angular2-flash-messages';
import { ClientService } from './../../services/client.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-details-client',
  templateUrl: './details-client.component.html',
  styleUrls: ['./details-client.component.css']
})
export class DetailsClientComponent implements OnInit {
id:string
client;
status:boolean=false
  constructor(
              private clientService : ClientService ,
              private route :ActivatedRoute,
              private routes : Router,
              private flashmsg : FlashMessagesService
              ) { }

  ngOnInit(): void {
    this.id =this.route.snapshot.params['id'];
    this.clientService.getoneclient(this.id).subscribe(client =>{
      this.client=client
      console.log(this.client)
    });
  }
  updatebalance(){
    this.client.id=this.id;
    this.clientService.updateBalance(this.client);
    this.flashmsg.show('balance Updated', {cssClass:'alert-success', timeout:3000})
  }
  deleteClient(id :string){
    if(confirm('are you sure to delete')){
this.clientService.deleteclient(id);
this.routes.navigate(['/'])
this.flashmsg.show('client deleted', {cssClass:'alert-danger', timeout:3000})
  }
}
}
