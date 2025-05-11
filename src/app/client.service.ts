import { Injectable } from '@angular/core';
import { Client } from './register/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor() { }

  save(client: Client) {
    console.log(client);
  }
}
