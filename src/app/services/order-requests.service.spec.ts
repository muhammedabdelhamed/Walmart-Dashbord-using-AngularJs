import { TestBed } from '@angular/core/testing';

import { OrderRequestsService } from './order-requests.service';

describe('OrderRequestsService', () => {
  let service: OrderRequestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderRequestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
