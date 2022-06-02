import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NzModalService } from 'ng-zorro-antd/modal';

import { DetailClientComponent } from './detail-client.component';

describe('DetailClientComponent', () => {
  let component: DetailClientComponent;
  let fixture: ComponentFixture<DetailClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailClientComponent ],
      providers: [
        { provide: NzModalService, useValue: {} }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
