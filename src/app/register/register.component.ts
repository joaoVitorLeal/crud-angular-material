import { Component, OnInit } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Client } from './client';
import { ClientService } from '../client.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask'

 
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
    NgxMaskDirective
  ], providers: [
    provideNgxMask()
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {

  client: Client = Client.newClient();
  isUpdating: boolean = false;

  constructor(
    private clientService: ClientService,
    private route: ActivatedRoute,
    private router: Router
  ) { // injeção de dependência por @Injectable 
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe( (query: any) => {
      const params = query['params'];
      const id = params['id'];

      if (id) {
        let foundClient = this.clientService.findById(id);
        if (foundClient) {
          this.isUpdating = true;
          this.client = foundClient;
        }
      }
    });
  }
  
  save(): void {
    if (!this.isUpdating) {
      this.clientService.save(this.client);
      this.client = Client.newClient(); // Limpa os dados do cliente atual para preparar para um novo cadastro
    } else {
      this.clientService.update(this.client);
      this.router.navigate(['/search']);
    }
  }
}
