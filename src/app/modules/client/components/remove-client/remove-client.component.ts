import { Client } from './../../models/client.model';
import { ClientService } from '../../services/client.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-remove-client',
  templateUrl: './remove-client.component.html',
  styleUrls: ['./remove-client.component.scss']
})
export class RemoveClientComponent implements OnInit {

  @Input() client: Client | undefined;
  @Input() visibleModalRemoveClient: boolean | undefined;
  @Output() onClose = new EventEmitter();
  @Output() reloadChildren: EventEmitter<boolean> = new EventEmitter();

  public statusRemoveClient: boolean = false;

  constructor(private clientService: ClientService, private modalService: NzModalService) { }

  ngOnInit(): void { 
  }

  closeModal(): void {
    this.onClose.emit();
    this.reloadChildren.emit(false);
  }

  removeClient(): void {
    this.clientService.removeClient(Number(this.client?.id), (status, response) => {
      if(status) {
        this.statusRemoveClient = true;
      } else {
        this.statusRemoveClient = false;
        this.modalService.error({
          nzTitle: 'Erro',
          nzContent: 'Houve um erro ao remover o cliente. ' + response
        });
      }
    })
  }

  closeModalBeforeRemoveClient(): void {
    this.onClose.emit();
    this.reloadChildren.emit(true);
  }

}
