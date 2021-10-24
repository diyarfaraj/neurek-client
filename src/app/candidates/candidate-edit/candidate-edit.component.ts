import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { Candidate } from 'src/app/_models/candidate';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { CandidatesService } from 'src/app/_services/candidates.service';

@Component({
  selector: 'app-candidate-edit',
  templateUrl: './candidate-edit.component.html',
  styleUrls: ['./candidate-edit.component.css'],
})
export class CandidateEditComponent implements OnInit {
  candidate: Candidate;
  user: User;

  constructor(
    private accountService: AccountService,
    private canidateService: CandidatesService
  ) {
    this.accountService.currentUser$
      .pipe(take(1))
      .subscribe((user) => (this.user = user));
    console.log(this.user);
  }

  ngOnInit(): void {
    this.loadCandidate();
  }

  loadCandidate() {
    this.canidateService
      .getCandidate(this.user.email)
      .subscribe((candidate) => (this.candidate = candidate));
  }
}
