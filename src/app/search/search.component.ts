import { Component, OnInit } from '@angular/core';
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatTableModule } from "@angular/material/table";
import { MatButtonModule } from "@angular/material/button";
import { ClientService } from '../client.service';
import { Client } from '../register/client';

@Component({
  selector: 'app-search',
  imports: [
    FlexLayoutModule,
    FormsModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit {

  clientList: Client[] = [];

  constructor(private clientService: ClientService) { }

  ngOnInit(): void {
    this.clientList = this.clientService.search('');
  }


}
