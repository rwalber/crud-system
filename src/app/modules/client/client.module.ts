import { CommonModule } from '@angular/common';
import { DEFAULT_CURRENCY_CODE, NgModule } from '@angular/core';

import { CpfPipe } from '../../pipes/cpf.pipe';
import { DatePipe } from '@angular/common';
import { NgZorroAntdModule } from '../ng-zorro-antd/ng-zorro-antd.module';
import { ClientRoutingModule } from './client-routing.module';
import { HomeClientComponent } from './pages/home-client/home-client.component';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { CreateEditClientComponent } from './pages/create-edit-client/create-edit-client.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RemoveClientComponent } from './components/remove-client/remove-client.component';
import { DetailClientComponent } from './components/detail-client/detail-client.component';

const maskConfig: Partial<IConfig> = {
  validation: false,
};
@NgModule({
  declarations: [
    CpfPipe,
    HomeClientComponent,
    CreateEditClientComponent,
    RemoveClientComponent,
    DetailClientComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    NgZorroAntdModule,
    ClientRoutingModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(maskConfig),
  ],
  providers: [ { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL ' }, DatePipe ]
})
export class ClientModule { }
