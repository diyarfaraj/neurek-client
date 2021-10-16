import { Education } from './education';
import { Experience } from './experience';
import { Photo } from './photo';
import { Preference } from './preference';
import { Skill } from './skill';

export interface Candidate {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  photoUrl: string;
  age: number;
  created: Date;
  lastActive: Date;
  deleted: boolean;
  skills: Skill[];
  educations: Education[];
  experiences: Experience[];
  preferences: Preference[];
  candidateFiles: any[];
  photos: Photo[];
}