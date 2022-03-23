import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Candidate } from 'src/app/_models/candidate';
import { Pagination } from 'src/app/_models/pagination';
import { Skill } from 'src/app/_models/skill';
import { CandidatesService } from 'src/app/_services/candidates.service';

@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.css'],
})
export class CandidateListComponent implements OnInit {
  candidates: Candidate[];
  pagination: Pagination;
  pageNumber = 1;
  pageSize = 3;
  constructor(private candidateService: CandidatesService) {}

  ngOnInit(): void {
    this.loadCandidates();
  }

  loadCandidates() {
    this.candidateService
      .getCandidates(this.pageNumber, this.pageSize)
      .subscribe((response) => {
        this.candidates = response.result;
        this.pagination = response.pagination;
      });
  }

  pageChanged(event: any) {
    this.pageNumber = event.page;
    this.loadCandidates();
  }
}
