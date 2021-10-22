import { Education } from './education';
import { Experience } from './experience';
import { Language } from './language';
import { Photo } from './photo';
import { Preference } from './preference';
import { Skill } from './skill';

export interface Candidate {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  jobTitle: string;
  description: string;
  city: string;
  photoUrl: string;
  age: number;
  created: Date;
  lastActive: Date;
  deleted: boolean;
  skills: Skill[];
  educations: Education[];
  experiences: Experience[];
  preferences: Preference[];
  languages: Language[];
  candidateFiles: any[];
  photos: Photo[];
}
