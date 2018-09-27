import { TestBed, inject } from '@angular/core/testing';

import { ArthropodService } from './arthropod.service';

describe('ArthropodService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ArthropodService]
    });
  });

  it('should be created', inject([ArthropodService], (service: ArthropodService) => {
    expect(service).toBeTruthy();
  }));
});
