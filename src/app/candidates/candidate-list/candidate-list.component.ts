import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Candidate } from 'src/app/_models/candidate';
import { Skill } from 'src/app/_models/skill';
import { CandidatesService } from 'src/app/_services/candidates.service';

@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.css'],
})
export class CandidateListComponent implements OnInit {
  candidates$: Observable<Candidate[]>;

  constructor(private candidateService: CandidatesService) {}

  ngOnInit(): void {
    this.candidates$ = this.candidateService.getCandidates();
  }

  /*   loadCandidates() {
    this.candidateService.getCandidates().subscribe((candidates) => {
      this.candidates = candidates;
    });
  } */
}
