import { AuthClientService } from './../../services/auth-client.service';
import { Client } from './../../model/model';
import { ClientService } from './../../services/client.service';
import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  searchClients:Client[];
  total:number=0;
clients :Client[];
  constructor( private clientService : ClientService,  private routes : Router,
    private flashmsg : FlashMessagesService, private authService : AuthClientService) { }

  ngOnInit(): void {
this.authService.getAuth().subscribe(auth =>{
  this.clientService.getClient(auth.uid).subscribe(client =>{
   this.searchClients= this.clients=client
    this.total = this.getTotal()
})
    });
  }

getTotal(){
  return this.clients.reduce((total, client) => {
return total + parseFloat(client.balance.toString());
  },0)
}
deleteClient(id :string){
  Swal.fire({
    title: 'Are you sure?',
    text: 'You will not be able to recover this imaginary file!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No, keep it'
  }).then((result) => {
    if (result.value) {
      this.clientService.deleteclient(id);
      this.routes.navigate(['/'])
      this.flashmsg.show('client deleted', {cssClass:'alert-danger', timeout:3000})
      Swal.fire(
        'Deleted!',
        'Client has been deleted.',
        'success'
      )
    } 
  })
    
  }

  search(query:string){
this.searchClients = (query) ? this.clients.filter(client => client.firstName.toLowerCase().includes(query.toLowerCase()) || client.lastName.toLowerCase().includes(query.toLowerCase()) || client.email.toLowerCase().includes(query.toLowerCase())) : this.clients;
  }
}
