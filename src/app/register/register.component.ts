import { Component } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Client } from './client';
import { ClientService } from '../client.service';

 
@Component({
  selector: 'app-register',
  imports: [
    FlexLayoutModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  client: Client = Client.newClient();

  constructor(private clientService: ClientService) { // injeção de dependência por @Injectable
  }
  
  save(): void {
    this.clientService.save(this.client);
  }
}
