import { DatePipe } from '@angular/common';
import { NzModalService } from 'ng-zorro-antd/modal';
import { RouterTestingModule } from '@angular/router/testing';
import { HomeClientComponent } from './home-client.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('HomeClientComponent', () => {
  let component: HomeClientComponent;
  let fixture: ComponentFixture<HomeClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeClientComponent ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
      ],
      providers: [
        { provide: NzModalService, useValue: {} },
        DatePipe,
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
