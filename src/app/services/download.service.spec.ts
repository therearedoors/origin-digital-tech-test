import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DownloadService } from './download.service';
import { CacheService } from './cache.service';

describe('DownloadService', () => {
  let downloadService: DownloadService;
  let cacheService: CacheService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DownloadService, CacheService]
    });

    downloadService = TestBed.inject(DownloadService);
    httpMock = TestBed.inject(HttpTestingController);
    cacheService = TestBed.inject(CacheService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(downloadService).toBeTruthy();
  });

  it('should return cached result if available', () => {
    const query = 'test';
    const cachedResult = { data: 'Cached result' };

    spyOn(cacheService, 'isCached').and.returnValue(true);
    spyOn(cacheService, 'getFromCache').and.returnValue(cachedResult);

    downloadService.searchData(query).subscribe(result => {
      expect(result).toEqual(cachedResult);
    });

    expect(cacheService.isCached).toHaveBeenCalledWith(query);
    expect(cacheService.getFromCache).toHaveBeenCalledWith(query);

    httpMock.expectNone(`${downloadService.apiUrl}?q=${query}`);
  });

  it('should make API call if result is not cached', () => {
    const query = 'test';
    const apiResult = { data: 'API result' };

    spyOn(cacheService, 'isCached').and.returnValue(false);
    spyOn(cacheService, 'cacheSearchResult');

    downloadService.searchData(query).subscribe(result => {
      expect(result).toEqual(apiResult);
    });

    const req = httpMock.expectOne(`${downloadService.apiUrl}?q=${query}`);
    expect(req.request.method).toBe('GET');
    req.flush(apiResult);

    expect(cacheService.cacheSearchResult).toHaveBeenCalledWith(query, apiResult);
  });
});
