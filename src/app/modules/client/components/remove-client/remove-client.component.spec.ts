import { RemoveClientComponent } from './remove-client.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NzModalService } from 'ng-zorro-antd/modal';

describe('RemoveClientComponent', () => {
  let component: RemoveClientComponent;
  let fixture: ComponentFixture<RemoveClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemoveClientComponent ],
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        { provide: NzModalService, useValue: {} }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
