import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import{SitoComponent} from './sito/sito.component';

const routes: Routes = [
  {path:"", component:SitoComponent}, //! quando non c'e nulla nel path lo mandi al component login
  {path:"dati", component:SitoComponent },//  = quando la route che cerco non esiste
  {path:"**", component:SitoComponent} 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
