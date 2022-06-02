import { DatePipe } from '@angular/common';
import { NzModalService } from 'ng-zorro-antd/modal';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateEditClientComponent } from './create-edit-client.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('CreateEditClientComponent', () => {
  let component: CreateEditClientComponent;
  let fixture: ComponentFixture<CreateEditClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEditClientComponent ],
      imports: [
        FormsModule,
        RouterTestingModule,
        ReactiveFormsModule,
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
    fixture = TestBed.createComponent(CreateEditClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('invalid name', () => {
    component.clientForm.controls['fullName'].setValue('');
    expect(component.clientForm.valid).toBeFalsy();

    component.clientForm.controls['fullName'].setValue('t u ');
    expect(component.clientForm.valid).toBeFalsy();

    component.clientForm.controls['fullName'].setValue('  ');
    expect(component.clientForm.valid).toBeFalsy();

    component.clientForm.controls['fullName'].setValue('Teste u');
    expect(component.clientForm.valid).toBeFalsy();
  });

  it('invalid cpf', () => {
    component.clientForm.controls['cpf'].setValue('string');
    expect(component.clientForm.valid).toBeFalsy();

    component.clientForm.controls['cpf'].setValue('11111');
    expect(component.clientForm.valid).toBeFalsy();

    component.clientForm.controls['cpf'].setValue('12345678910');
    expect(component.clientForm.valid).toBeFalsy();
  });

  it('invalid birthdate', () => {
    component.clientForm.controls['birthdate'].setValue(new Date('39-04-19'));
    expect(component.clientForm.valid).toBeFalsy();

    component.clientForm.controls['birthdate'].setValue(new Date);
    expect(component.clientForm.valid).toBeFalsy();
  });

  it('invalid email', () => {
    component.clientForm.controls['email'].setValue('mail@');
    expect(component.clientForm.valid).toBeFalsy();

    component.clientForm.controls['email'].setValue('    ');
    expect(component.clientForm.valid).toBeFalsy();

    component.clientForm.controls['email'].setValue('mail@mail');
    expect(component.clientForm.valid).toBeFalsy();
  });

  it('invalid monthlyIncome', () => {
    component.clientForm.controls['monthlyIncome'].setValue('    ');
    expect(component.clientForm.valid).toBeFalsy();
  });

  it('valid form client', () => {
    component.clientForm.controls['fullName'].setValue("Teste unitário");
    component.clientForm.controls['cpf'].setValue("89979046040");
    component.clientForm.controls['birthdate'].setValue(new Date('89-04-19'));
    component.clientForm.controls['monthlyIncome'].setValue(1000);
    component.clientForm.controls['email'].setValue("teste_unitario@teste.com");
    component.clientForm.controls['registrationDate'].setValue(new Date);
    expect(component.clientForm.valid).toBeTruthy();
  });

});
