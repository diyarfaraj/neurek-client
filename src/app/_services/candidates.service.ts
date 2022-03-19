import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Candidate } from '../_models/candidate';
import { PaginatedResult } from '../_models/pagination';

@Injectable({
  providedIn: 'root',
})
export class CandidatesService {
  baseUrl = environment.apiUrl;
  candidates: Candidate[] = [];
  paginatedResult: PaginatedResult<Candidate[]> = new PaginatedResult<
    Candidate[]
  >();

  constructor(private http: HttpClient) {}

  getCandidates(page?: number, itemsPerPage?: number) {
    let params = new HttpParams();
    if (page !== null && itemsPerPage !== null) {
      params = params.append('pageNumber', page.toString());
      params = params.append('pageSize', itemsPerPage.toString());
    }

    // if (this.candidates.length > 0) return of(this.candidates);
    return this.http
      .get<Candidate[]>(this.baseUrl + 'users', { observe: 'response', params })
      .pipe(
        map((response) => {
          this.paginatedResult.result = response.body;
          if (response.headers.get('Pagination') !== null) {
            this.paginatedResult.pagination = JSON.parse(
              response.headers.get('Pagination')
            );
          }
          return this.paginatedResult;
        })
      );
  }

  getCandidate(email: string) {
    const candidate = this.candidates.find((x) => x.email === email);
    if (candidate !== undefined) return of(candidate);
    return this.http.get<Candidate>(this.baseUrl + 'users/' + email);
  }

  updateCandidate(candidate: Candidate) {
    return this.http.put(this.baseUrl + 'users', candidate).pipe(
      map(() => {
        const index = this.candidates.indexOf(candidate);
        this.candidates[index] = candidate;
      })
    );
  }

  setMainPhoto(photoId: number) {
    return this.http.put(this.baseUrl + 'users/set-main-photo/' + photoId, {});
  }

  deletePhoto(photoId: number) {
    return this.http.delete(this.baseUrl + 'users/delete-photo/' + photoId);
  }
}
