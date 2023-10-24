import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CalculadoraComponent } from './calculadora.page';

const routes: Routes = [
  {
    path: '',
    component: CalculadoraComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CalculadoraPageRoutingModule {}
