import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CalculadoraPageRoutingModule } from './calculadora-routing.module';

import { CalculadoraComponent } from './calculadora.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        CalculadoraPageRoutingModule
    ],
    declarations: [CalculadoraComponent]
})
export class CalculadoraPageModule { }
