import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CacheService } from './cache.service';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {

  apiUrl = 'https://api.github.com/search/repositories';

  constructor(private http: HttpClient, private cacheService: CacheService) { }

  searchData(query: string): Observable<any> {
    if (this.cacheService.isCached(query)) {
      return of(this.cacheService.getFromCache(query));
    } else {
      const url = `${this.apiUrl}?q=${query}`;
      return this.http.get(url).pipe(
        tap(result => {
          this.cacheService.cacheSearchResult(query, result);
        })
      );
    }
  }
}
