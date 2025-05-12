import { Injectable } from '@angular/core';
import { Client } from './register/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  static readonly CLIENT_REPOSITORY_KEY = "CLIENTS";

  constructor() { }

  save(client: Client): void {
    const clients = this.getStorage();
    clients.push(client);

    localStorage.setItem(ClientService.CLIENT_REPOSITORY_KEY, JSON.stringify(clients));
  }

  search(searchName: string): Client[] {
    const clients = this.getStorage();
    
    if (!searchName) {
      return clients;
    }

    return clients.filter(client => 
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
    const clients = this.getStorage();
    clients.forEach(c => {
      if (c.id === client.id) {
        Object.assign(c, client); // assign(para este objeto (c), substitua-o por este outro objeto (client)) – // Atualiza o objeto 'c' com os dados de 'client', substituindo os valores correspondentes
      }
    });
    localStorage.setItem(ClientService.CLIENT_REPOSITORY_KEY, JSON.stringify(clients));
  }

  delete(client: Client): void {
    const clients = this.getStorage();
    const newList = clients.filter(c => c.id !== client.id);
    localStorage.setItem(ClientService.CLIENT_REPOSITORY_KEY, JSON.stringify(newList));
  }

  /**
   * @deprecated Use o método delete() com filter() em vez deste.
   * Demonstra uma abordagem alternativa de remoção, modificando o array original.
   */
  deleteManuallyFromList(client: Client): void {
    const clients = this.getStorage();

    const index = clients.indexOf(client);
    if (index > -1) {
      clients.splice(index, 1);
    }

    localStorage.setItem(ClientService.CLIENT_REPOSITORY_KEY, JSON.stringify(clients));
  }


  /**
   * @deprecated Use o método `delete()` com `filter()` no lugar deste.
   * Este método altera diretamente o array original, o que não é uma boa prática.
   */
  deleteWithSplice(client: Client): void {
    console.warn("deleteComSplice está obsoleto. Use o método 'delete' com filter().");

    const clients = this.getStorage();
    const index = clients.indexOf(client);
    if (index > -1) {
      clients.splice(index, 1);
    }
    localStorage.setItem(ClientService.CLIENT_REPOSITORY_KEY, JSON.stringify(clients));
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
