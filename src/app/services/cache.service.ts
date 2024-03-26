import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  private cache: Map<string, any> = new Map<string, any>();

  constructor() { }

  cacheSearchResult(query: string, result: any) {
    this.cache.set(query, result);
  }

  getFromCache(query: string): any {
    return this.cache.get(query);
  }

  isCached(query: string): boolean {
    return this.cache.has(query);
  }
}
