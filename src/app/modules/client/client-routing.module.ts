import { NgModule } from '@angular/core';
import { HomeClientComponent } from './pages/home-client/home-client.component';
import { RouterModule, Routes } from '@angular/router';
import { CreateEditClientComponent } from './pages/create-edit-client/create-edit-client.component';

const routes: Routes = [
  { path: '', component: HomeClientComponent },
  { path: 'create-edit', component: CreateEditClientComponent, children: [
    { path: ':id', component: CreateEditClientComponent },
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
