import { Component, Input, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { Candidate } from 'src/app/_models/candidate';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { environment } from 'src/environments/environment';
import { take } from 'rxjs/operators';
import { CandidatesService } from 'src/app/_services/candidates.service';
import { Photo } from 'src/app/_models/photo';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css'],
})
export class PhotoEditorComponent implements OnInit {
  @Input() candidate: Candidate;
  uploader: FileUploader;
  hasBaseDropZoneOver = false;
  baseUrl = environment.apiUrl;
  newCanidate: Candidate;
  user: User;

  constructor(
    private accountService: AccountService,
    private candidateService: CandidatesService
  ) {
    this.user = {} as User;
    this.accountService.currentUser$
      .pipe(take(1))
      .subscribe((user) => (this.user = user));
  }

  ngOnInit(): void {
    this.initUploader();
  }

  fileOverBase(e: any) {
    this.hasBaseDropZoneOver = e;
  }

  initUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'users/add-photo',
      authToken: 'Bearer ' + this.user.token,
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024,
    });
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const photo: Photo = JSON.parse(response);
        this.candidate.photos.push(photo);
        if (photo.isMain) {
          this.user.photoUrl = photo.url;
          this.candidate.photoUrl = photo.url;
          this.accountService.setCurrentUser(this.user);
        }
      }
    };
  }

  setMainPhoto(photo: Photo) {
    this.candidateService.setMainPhoto(photo.id).subscribe(() => {
      this.user.photoUrl = photo.url;
      this.accountService.setCurrentUser(this.user);
      this.candidate.photoUrl = photo.url;
      this.candidate.photos.forEach((p) => {
        if (p.isMain) p.isMain = false;
        if (p.id === photo.id) p.isMain = true;
      });
    });
  }

  deletePhoto(photoId: number) {
    this.candidateService.deletePhoto(photoId).subscribe(() => {
      this.candidate.photos = this.candidate.photos.filter(
        (p) => p.id !== photoId
      );
    });
  }
}
