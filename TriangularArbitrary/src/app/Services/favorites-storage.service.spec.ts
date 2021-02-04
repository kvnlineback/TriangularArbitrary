import { TestBed } from '@angular/core/testing';

import { FavoritesStorageService } from './favorites-storage.service';

describe('FavoritesStorageService', () => {
  let service: FavoritesStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavoritesStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
