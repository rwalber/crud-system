import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Client } from '../../models/client.model';

@Component({
  selector: 'app-detail-client',
  templateUrl: './detail-client.component.html',
  styleUrls: ['./detail-client.component.scss']
})
export class DetailClientComponent implements OnInit {

  @Input() client: Client | undefined;
  @Input() visibleModalDetailClient: boolean | undefined;
  @Output() onClose = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  closeModal(): void {
    this.onClose.emit();
  }

}
