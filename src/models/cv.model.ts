import { Experience } from './experience.model';
import { Job } from './job.model';
import { Education } from './education.model';

export class CV {
    public personal_info = {
        first_name: '',
        second_name: '',
        residence: '',
        languages: [],
        education: [],
        birthday: ''
    };
    public contact_info = {
        address: '',
        phone: '',
        email: '',
        linkedin: '',
        github: ''
    };
    public preferences = {
        description: '',
        area: '',
        position: '',
        salary_from: '',
        salary_till: ''
    };
    public prof_info =  {
        experience: [],
        skills: [],
        jobs: [],
        achievements: '',
        certification: [],
    };
    public footer_info = '';
    public activated = false;
}
