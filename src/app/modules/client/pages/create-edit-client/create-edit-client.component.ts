import { Client } from '../../models/client.model';
import { DatePipe } from '@angular/common';
import { ClientService } from '../../services/client.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { HasLastName } from '../../../../validators/hasLastName.validator';
import { AgeValidator } from '../../../../validators/age.validator';
import { CpfCnpjValidator } from '../../../../validators/cpf-cnpj.validator';

@Component({
  selector: 'app-create-edit-client',
  templateUrl: './create-edit-client.component.html',
  styleUrls: ['./create-edit-client.component.scss']
})
export class CreateEditClientComponent implements OnInit {

  public clientForm: FormGroup;
  public toEditClient: boolean = false;
  private idClient: number | undefined;

  constructor(
    private fb: FormBuilder, 
    private clientService: ClientService, 
    private modalService: NzModalService, 
    private router: Router, 
    private activateRoute: ActivatedRoute, 
    private datepipe: DatePipe) { 
    
      this.clientForm = this.fb.group({
      fullName: new FormControl('', [
        Validators.required,
        HasLastName.validate,
      ]),
      cpf: new FormControl('', [
        Validators.required,
        Validators.maxLength(11),
        Validators.minLength(11),
        CpfCnpjValidator.validate,
      ]),
      birthdate: new FormControl('', [
        Validators.required,
        AgeValidator.validate,
      ]),
      monthlyIncome: new FormControl('', [
        Validators.required
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      registrationDate: new FormControl(new Date, [
        Validators.required
      ])
    });
  }

  ngOnInit(): void {
    const id = this.activateRoute.firstChild?.snapshot.params['id'];
    if(id) {
      this.idClient = id;
      this.getClientById(id);
    }
  }

  createClient(): void {
    this.clientService.createClient(this.clientForm.value, (status, response) => {
      if(status) {
        this.modalService.success({
          nzTitle: 'Sucesso.',
          nzContent: 'Cadastro realizado com sucesso!',
          nzOnOk: () => {
            this.router.navigate(['/client']);
          }
        });
      } else {  
        this.modalService.error({
          nzTitle: 'Erro',
          nzContent: 'Houve um erro ao cadastrar cliente. ' + response
        });
      }
    });
  }

  updateForm(client: Client): void {
    this.clientForm.patchValue({
      fullName: client.fullName,
      cpf: client.cpf,
      birthdate: this.datepipe.transform(client.birthdate, 'yyyy-MM-dd'),
      email: client.email,
      monthlyIncome: client.monthlyIncome,
      registrationDate: new Date(),
    });
  }

  getClientById(id: number): void {
    this.clientService.getClientById(id, (status, response) => {
      if(status) {
        this.updateForm(response);
        this.toEditClient = true;
      } else {
        this.toEditClient = false;
        this.modalService.error({
          nzTitle: 'Erro',
          nzContent: 'Houve um erro ao buscar informações do cliente. ' + response,
          nzOnOk: () => {
            this.router.navigate(['/client']);
          }
        });
      }
    });
  }

  updateClient(): void {
    this.clientService.editClient(Number(this.idClient), this.clientForm.value, (status, response) => {
      if(status) {
        this.modalService.success({
          nzTitle: 'Sucesso.',
          nzContent: 'Cadastro atualizado com sucesso!',
          nzOnOk: () => {
            this.router.navigate(['/client']);
          }
        });
      } else {  
        this.modalService.error({
          nzTitle: 'Erro',
          nzContent: 'Houve um erro ao atualizar os dados do cliente. ' + response
        });
      }
    });
  }
}
