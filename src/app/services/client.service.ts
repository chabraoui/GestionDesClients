import { Client } from './../model/model';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ClientService {
  clienttDoc: AngularFirestoreDocument<Client>
clientCollection:AngularFirestoreCollection<Client>;
clients: Observable<Client[]>
  constructor(private afs :AngularFirestore) {
    this.clientCollection = this.afs.collection<Client>('clients');

   }

   getClient(user:string){
     return this.clients=this.afs.collection('clients', ref => ref.where('user', '==', user)).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Client;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
   }
   newClient(client:Client){
     this.clientCollection.add(client);
   }

   getoneclient(id:string){
    return this.clientCollection.doc(id).valueChanges();
   }
   updateBalance(client : Client){
     this.clienttDoc=this.clientCollection.doc(client.id)
     this.clienttDoc.update(client);
   }
   deleteclient(id : string){
    return this.afs.collection('clients').doc(id).delete();
   }
}
