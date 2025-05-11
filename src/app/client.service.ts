import { Injectable } from '@angular/core';
import { Client } from './register/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  static readonly CLIENT_REPOSITORY_KEY = "CLIENTS";

  constructor() { }

  save(client: Client): void {
    const storage = this.getStorage();
    storage.push(client);

    localStorage.setItem(ClientService.CLIENT_REPOSITORY_KEY, JSON.stringify(storage));
  }

  search(name: string): Client[] {
    return this.getStorage();
  }

  private getStorage(): Client[] {
    const clientRepository = localStorage.getItem(ClientService.CLIENT_REPOSITORY_KEY);
    if(clientRepository) {
      const clients: Client[] = JSON.parse(clientRepository);
      return clients;
    }

    const clients: Client[] = [];
    localStorage.setItem(ClientService.CLIENT_REPOSITORY_KEY, JSON.stringify(clients));
    return clients;
  }
}
