import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Candidate } from '../_models/candidate';

@Injectable({
  providedIn: 'root',
})
export class CandidatesService {
  baseUrl = environment.apiUrl;
  candidates: Candidate[] = [];

  constructor(private http: HttpClient) {}

  getCandidates() {
    if (this.candidates.length > 0) return of(this.candidates);
    return this.http.get<Candidate[]>(this.baseUrl + 'users').pipe(
      map((candidates) => {
        this.candidates = candidates;
        return candidates;
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
}
