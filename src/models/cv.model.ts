import {Experience} from './experience.model';
import {Job} from './job.model';
import {Education} from './education.model';

export class CV {
  public id: null;
  public personal_info = {
    first_name: '',
    second_name: '',
    residence: '',
    languages: [''],
    education: [new Education('', '', '', '', '')],
    birthday: '',
    other_link: '',
    summary: '',
    about: ''
  };
  public contact_info = {
    address: '',
    phone: '',
    email: '',
    linkedin: ''
  };
  public preferences = {
    description: '',
    area: '',
    position: '',
    salary_from: '',
    salary_till: ''
  };
  public prof_info = {
    experience: [new Experience('', null)],
    skills: [''],
    jobs: [new Job('', '', -1, '', '', '')],
    achievements: [''],
    certification: [''],
    portfolio: '',
    github: '',
    recommendations: ''
  };
  public settings = {
    title: 'Title',
    activated: false,
    template: {
      type: 0,
      colorScheme: 0
    },
    candidate_id: null
  };
}
