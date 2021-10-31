import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { Candidate } from 'src/app/_models/candidate';
import { Experience } from 'src/app/_models/experience';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { CandidatesService } from 'src/app/_services/candidates.service';

@Component({
  selector: 'app-candidate-edit',
  templateUrl: './candidate-edit.component.html',
  styleUrls: ['./candidate-edit.component.css'],
})
export class CandidateEditComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm = new NgForm([], []);
  candidate: Candidate;
  user: User;
  experiences: Experience[];
  @HostListener('window:beforeunload', ['$event']) unloadNotification(
    $event: any
  ) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(
    private accountService: AccountService,
    private canidateService: CandidatesService,
    private toastr: ToastrService
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

  updateCandidate() {
    this.canidateService.updateCandidate(this.candidate).subscribe(() => {
      this.toastr.success('Profile updated');
      this.editForm.resetForm(this.candidate);
      this.loadCandidate();
    });
  }
}
