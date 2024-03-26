import { TestBed } from '@angular/core/testing';

import { CacheService } from './cache.service';

describe('CacheService', () => {
  let service: CacheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CacheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should cache search result', () => {
    const query = 'test';
    const result = { data: 'Cached result' };

    service.cacheSearchResult(query, result);

    expect(service.isCached(query)).toBeTrue();
    expect(service.getFromCache(query)).toEqual(result);
  });

  it('should retrieve cached result', () => {
    const query = 'test';
    const result = { data: 'Cached result' };

    service.cacheSearchResult(query, result);

    expect(service.getFromCache(query)).toEqual(result);
  });

  it('should return null if result is not cached', () => {
    const query = 'test';

    expect(service.isCached(query)).toBeFalse();
    expect(service.getFromCache(query)).toBeUndefined();
  });

});
