import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { SearchComponent } from './search/search.component';

export const routes: Routes = [
    { path: 'register', component: RegisterComponent },
    { path: 'search', component: SearchComponent }
];
