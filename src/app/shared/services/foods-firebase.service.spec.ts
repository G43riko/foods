import { TestBed } from '@angular/core/testing';

import { FoodsFirebaseService } from './foods-firebase.service';

describe('FoodsFirebaseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FoodsFirebaseService = TestBed.get(FoodsFirebaseService);
    expect(service).toBeTruthy();
  });
});
