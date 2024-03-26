import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DownloadService } from './services/download.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';
import { Observable, Subject, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, catchError, tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule, HttpClientModule],
  providers: [DownloadService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  searchData: any;
  loading: boolean = false;
  private searchTerms = new Subject<string>();

  constructor(private downloadService: DownloadService) {
    this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => this.loading = true),
      switchMap(term => this.getSearchData(term).pipe(
        tap(() => this.loading = false)
      ))
    ).subscribe(data => {
      this.searchData = data;
    });
  }

  getSearchData(term: string): Observable<any> {
    if (term.length >= 3) {
      return this.downloadService.searchData(term);
        } else {
      return of([]);
    }
  }

  onSearchInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchTerms.next(target.value);
  }

}
