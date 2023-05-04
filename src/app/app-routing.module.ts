import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './components/pages/register/register.component';
import { ClientListComponent } from './components/pages/client-list/client-list.component';

const routes: Routes = [
  { path: '', component: RegisterComponent },
  { path: 'lista-clientes', component: ClientListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
