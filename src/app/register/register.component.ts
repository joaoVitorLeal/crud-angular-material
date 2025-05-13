import { Component, OnInit, inject } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar'
import { MatSelectChange, MatSelectModule } from '@angular/material/select'
import { Client } from './client';
import { ClientService } from '../client.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask'
import { BrazilApiService } from '../brazil-api.service';
import { BrazilianState, City } from '../brasil-api.models';
import { CommonModule } from '@angular/common';
 
@Component({
  selector: 'app-register',
  imports: [
    FlexLayoutModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    NgxMaskDirective,
    CommonModule
  ], providers: [
    provideNgxMask()
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {

  client: Client = Client.newClient();
  isUpdating: boolean = false;
  private _snackBar: MatSnackBar = inject(MatSnackBar);
  states: BrazilianState[] = [];
  cities: City[] = [];

  constructor(
    private clientService: ClientService,
    private brazilApiService: BrazilApiService,
    private route: ActivatedRoute,
    private router: Router
  ) { } // injeção de dependência por @Injectable

  ngOnInit(): void {
    this.route.queryParamMap.subscribe( (query: any) => {
      const params = query['params'];
      const id = params['id'];

      if (id) {
        let foundClient = this.clientService.findById(id);
        if (foundClient) {
          this.isUpdating = true;
          this.client = foundClient;

          if (this.client.stateAbbreviation) {
            const event = {value: this.client.stateAbbreviation}
            this.loadCities(event as MatSelectChange)
          }
        }
      }
    });

    this.loadUfs();
  }
  
  loadUfs(): void {
    console.log("Carregando UFs....");
    
    // Observable - Subscribe
      this.brazilApiService.listUfs().subscribe({
      next: stateList => this.states = stateList, // Sucesso – Retorna uma lista de estados
      error: erro => console.log("Ocorreu um erro ao listar cidades: ", erro) // Erro – retorna um erro declaro pela API
    });
  }

  loadCities(event: MatSelectChange): void {
    const selectedUf = event.value;
    // Observable - Subscribe
    this.brazilApiService.listCities(selectedUf).subscribe({
      next: citiesList => this.cities = citiesList,
      error: erro => console.log('Ocorreu um erro ao listar municípios: ' + erro)
      
    });
  }

  save(): void {
    if (!this.isUpdating) {
      this.clientService.save(this.client);
      this.client = Client.newClient(); // Limpa os dados do cliente atual para preparar para um novo cadastro
      this.showSnackBar("Salvo com sucesso!");
    } else {
      this.clientService.update(this.client);
      this.router.navigate(['/search']);
      this.showSnackBar("Atualizado com sucesso!");
    }
  }

  private showSnackBar(message: string): void {
    this._snackBar.open(message, "Ok")
  }
}
