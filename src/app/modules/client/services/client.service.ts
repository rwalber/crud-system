import { Client } from '../models/client.model';
import { Pagination } from './../models/pagination.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RequestService, CallBackRequest } from '../../../services/request.service';

@Injectable({
  providedIn: 'root'
})
export class ClientService extends RequestService {

  constructor(protected http: HttpClient) { 
    super(http);
  }

  getClients(callback: CallBackRequest<any>, pagination?: Pagination, searchString?: string): void {
    this.getRequest('/client', (status, response, totalElements) => {
      status ? callback(true, response as Client[], totalElements) : callback(false, response as string);
    }, pagination, searchString);
  }

  getClientById(id: number, callback: CallBackRequest<any>): void {
    this.getRequestById(`/client/${id}`, (status, response) => {
      status ? callback(true, response as Client) : callback(false, response as string);
    });
  }

  createClient(paylod: Client, callback: CallBackRequest<any>): void {
    this.postRequest('/client', paylod, (status, response) => {
      status ? callback(true, response as Client) : callback(false, response as string);
    });
  }

  removeClient(id: number, callback: CallBackRequest<any>): void {
    this.deleteRequest(`/client/${id}`, (status, response) => {
      status ? callback(true, response as string) : callback(false, response as string);
    });
  }

  editClient(id: number, paylod: Client, callback: CallBackRequest<any>): void {
    this.putRequest(`/client/${id}`, paylod, (status, response) => {
      status ? callback(true, response as Client) : callback(false, response as string);
    });
  }


}
