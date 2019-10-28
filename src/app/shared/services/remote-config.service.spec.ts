import { TestBed } from '@angular/core/testing';

import { RemoteConfigService } from './remote-config.service';

describe('RemoteConfigService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RemoteConfigService = TestBed.get(RemoteConfigService);
    expect(service).toBeTruthy();
  });
});
