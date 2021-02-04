import { TestBed } from '@angular/core/testing';

import { CryptoAssetService } from './crypto-asset.service';

describe('CryptoAssetService', () => {
  let service: CryptoAssetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CryptoAssetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
