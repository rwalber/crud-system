import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';

import { NZ_I18N, pt_BR } from 'ng-zorro-antd/i18n';

const antModules = [
  NzIconModule,
  NzFormModule,
  NzInputModule,
  NzTableModule,
  NzModalModule,
	NzLayoutModule,
  NzButtonModule,
  NzToolTipModule,
  NzDatePickerModule,
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...antModules,
  ],
  exports: [
    ...antModules
  ],
  providers: [
    { provide: NZ_I18N, useValue: pt_BR },
  ]
})
export class NgZorroAntdModule { }
