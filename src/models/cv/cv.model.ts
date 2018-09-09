import { Activity } from './cv.activity.model';
import { Certification } from './cv.certification.model';
import { Achievement } from './cv.achievement.model';
import { Job } from './cv.job.model';
import { Education } from './cv.education.model';
import { Skill } from './cv.skill.model';
import { Language } from './cv.lang.model';
import { Template } from './cv.template.model';
import { Position } from './cv.position.model';

export class CV {
    public id: number;
    public firstName: string;
    public lastName: string;
    public summary: string;
    public about: string;
    public email: string;
    public phone: string;
    public residence: string;
    public birthday: string;
    public linkedin: string;
    public github: string;
    public recommendations: string;
    public title: string;
    public activated: boolean;
    public portfolio: string;
    public preferencedArea: string;
    public salaryFromPreference: number;
    public salaryTillPreference: number;
    public views: number;

    public cvActivity = [];
    public cvJobs = [];
    public cvAchievements = [];
    public cvCertification = [];
    public education = [];
    public template = new Template(null, null, null);
    public positionPreference = new Position(null, null);
    public languages = [];
    public skills = [];

    constructor(cv?) {
        if (!cv) {
            this.positionPreference = new Position(null, '');
            this.template = new Template(null, 0, 0);
            this.languages.push(new Language(null, ''));
            this.skills.push(new Skill(null, ''));
            this.education.push(new Education(null, '', null, '', '', ''));
            this.cvJobs.push(new Job(null, '', null, '', '', null, null, 50));
            this.cvAchievements.push(new Achievement('', null));
            this.cvCertification.push(new Certification('', null));
        }
    }
}
