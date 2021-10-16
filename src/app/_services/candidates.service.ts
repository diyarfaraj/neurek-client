import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Candidate } from '../_models/candidate';

const httpOptions = {
  headers: new HttpHeaders({
    Authorization:
      'Bearer ' + JSON.parse(localStorage.getItem('user') || '{}').token,
  }),
};

@Injectable({
  providedIn: 'root',
})
export class CandidatesService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getCandidates() {
    return this.http.get<Candidate[]>(this.baseUrl + 'users', httpOptions);
  }

  getCandidate(email: string) {
    return this.http.get<Candidate>(
      this.baseUrl + 'user/' + email,
      httpOptions
    );
  }
}
