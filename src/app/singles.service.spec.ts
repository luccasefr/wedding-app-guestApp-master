import { TestBed, inject } from '@angular/core/testing';

import { SinglesService } from './singles.service';

describe('SinglesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SinglesService]
    });
  });

  it('should be created', inject([SinglesService], (service: SinglesService) => {
    expect(service).toBeTruthy();
  }));
});
