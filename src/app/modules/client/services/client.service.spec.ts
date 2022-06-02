import { TestBed } from '@angular/core/testing';
import { ClientService } from './client.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ClientService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        ClientService,
      ]
    });
  });

  it('should be created', () => {
    const service: ClientService = TestBed.inject(ClientService);
    expect(service).toBeTruthy();
  });
});
