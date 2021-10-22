import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Candidate } from 'src/app/_models/candidate';
import { CandidatesService } from 'src/app/_services/candidates.service';

@Component({
  selector: 'app-candidate-detail',
  templateUrl: './candidate-detail.component.html',
  styleUrls: ['./candidate-detail.component.css'],
})
export class CandidateDetailComponent implements OnInit {
  candidate: Candidate = {} as Candidate;

  constructor(
    private candidateService: CandidatesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadCandidate();
    console.log(this.candidate.languages);
  }

  loadCandidate() {
    this.candidateService
      .getCandidate(this.route.snapshot.paramMap.get('email') || '{}')
      .subscribe((candidate) => {
        this.candidate = candidate;
      });
  }
}
