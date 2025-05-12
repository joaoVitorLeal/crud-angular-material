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

  search(searchName: string): Client[] {
    const data = this.getStorage();
    
    if (!searchName) {
      return data;
    }

    return data.filter(client => 
      client.name
      ?.normalize("NFD") // Separa os caracteres acentuados (ex: "é" vira "e" + acento)
      .replace(/[\u0300-\u036f]/g, "") // Remove os acentos usando regex
      .toLowerCase() // Converte para minúsculas para garantir case-insensitive
      .includes(
        searchName
          .normalize("NFD") // Mesmo processo para a string digitada
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase()
      )
    );
  }

  findById(id: string): Client | undefined {
    const data = this.getStorage();
    return data.find(client => client.id === id);
  }

  update(client: Client): void {
    // const data = this.getStorage();
    // const foundClient = data.find(c => c === client);
    // if (foundClient) {
    //   foundClient.name = client.name;
    //   foundClient.email = client.email;
    //   foundClient.cpf = client.cpf;
    //   foundClient.birthDate = client.birthDate;

    //   this.save(foundClient);
    // }
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
