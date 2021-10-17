import { Component, Input, OnInit } from '@angular/core';
import { Candidate } from 'src/app/_models/candidate';

@Component({
  selector: 'app-candidate-card',
  templateUrl: './candidate-card.component.html',
  styleUrls: ['./candidate-card.component.css'],
})
export class CandidateCardComponent implements OnInit {
  @Input()
  candidate!: Candidate;

  constructor() {}

  ngOnInit(): void {}
}
