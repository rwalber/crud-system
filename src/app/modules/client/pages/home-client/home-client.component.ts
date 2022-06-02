import { Client } from '../../models/client.model';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common'
import { Pagination } from '../../models/pagination.model';
import { ClientService } from '../../services/client.service';
import { NzTableSortFn } from 'ng-zorro-antd/table';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Component, OnInit } from '@angular/core';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home-client',
  templateUrl: './home-client.component.html',
  styleUrls: ['./home-client.component.scss']
})
export class HomeClientComponent implements OnInit {

  public clients: Client[] = [];
  public loadingClients: boolean = false;
  public selectedClient: Client | undefined;
  public listOfCurrentPageData: readonly Client[] = [];
  
  public visibleModalRemoveClient: boolean = false;
  public visibleModalDetailClient: boolean = false;

  private searchString: string = '';
  
  public pagination =  new Pagination();
  public searchForm = new FormGroup({
    searchInput: new FormControl('', Validators.required),
  });

  public sortFn: NzTableSortFn<Client> | null;
  public sortFnOrder = ['ascend', 'descend'];

  constructor(private clientService: ClientService, private modalService: NzModalService, private router: Router, private datepipe: DatePipe) { 
    this.sortFn = (a: Client, b: Client) => a.fullName.localeCompare(b.fullName);
  }

  ngOnInit(): void {
    this.getClients();
  }

  getClients(): void {
    this.loadingClients = true;
    this.clientService.getClients((status, response, totalElements) => {
      if(status) {
        this.clients = response;
        this.pagination.totalElements = Number(totalElements);
      } else {
        this.modalService.error({
          nzTitle: 'Erro',
          nzContent: 'Erro ao carregar a lista de cliente. ' + response
        });
      }
      this.loadingClients = false;
    }, this.pagination, this.searchString);
  }

  searchClients(): void {
    let isCpf = /^[\d . -]+$/.test(this.searchForm.get('searchInput')?.value);
    let isName = /^[a-zA-Z ]+$/.test(this.searchForm.get('searchInput')?.value);
    let isBirthdate = String(this.searchForm.get('searchInput')?.value).includes('/') && /\d/.test(this.searchForm.get('searchInput')?.value);
    
    if(isBirthdate) {
      let date = new Date(String(this.searchForm.get('searchInput')?.value).split('/').reverse().join('-'));
      this.searchString = `&birthdate_like=${this.datepipe.transform(date, 'yyyy-MM-dd')}`;
    }
    else if(isCpf) {
      this.searchString = `&cpf_like=${this.searchForm.get('searchInput')?.value.replace(/[\. ,:-]+/g, "")}`;
    }
    else if(isName) {
      this.searchString = `&fullName_like=${this.searchForm.get('searchInput')?.value}`;
    } else {
      this.searchString = '';
    }
    
    this.getClients();
  }

  onCurrentPageChange(params: NzTableQueryParams): void {
    this.pagination.size = params.pageSize;
    this.pagination.page = params.pageIndex;
    this.getClients();
  }

  reloadChildrenBeforeChanges(): void{
    this.pagination.page = 1;
    this.getClients();
  }

  openModalDetailClient(client: Client): void {
    this.selectedClient = client;
    this.visibleModalDetailClient = true;
  }

  closeDetailClient(): void {
    this.selectedClient = undefined;
    this.visibleModalDetailClient = false;
  }

  editClient(id: number): void {
    this.router.navigate([`client/create-edit/${id}`]);
  }

  openModalRemoveClient(client: Client): void {
    this.selectedClient = client;
    this.visibleModalRemoveClient = true;
  }

  closeRemoveClient(): void {
    this.selectedClient = undefined;
    this.visibleModalRemoveClient = false;
  }

}
