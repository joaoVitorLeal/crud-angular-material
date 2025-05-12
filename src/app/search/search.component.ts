import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatTableModule } from "@angular/material/table";
import { MatButtonModule } from "@angular/material/button";
import { ClientService } from '../client.service';
import { Client } from '../register/client';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  imports: [
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    FlexLayoutModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit {

  searchName: string = '';
  clientList: Client[] = [];
  tableColumns: string[] = ["id", "name", "cpf", "birthDate", "email", "actions"];
  
  constructor(
    private clientService: ClientService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.clientList = this.clientList = this.clientService.search('');
  }

  searchByName(): void {
    this.clientList = this.clientService.search(this.searchName);
  }

  // Navegar entre páginas
  prepareEdit(id: string): void {
    this.router.navigate(['/register'], { queryParams: { "id": id } }) // navigate(['/rota/de/destino'], parâmetros) • Navega para a página de cadastro carregando o cliente com o ID informado
  }

  prepareDelete(client: Client): void {
    client.isDeleting = true;
  }

  delete(client: Client): void {
    this.clientService.delete(client);
    this.clientList = this.clientService.search('');
  }
}
