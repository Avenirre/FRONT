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
    public id: number = null;
    public firstName: string = null;
    public lastName: string = null;
    public profileId: number = 1;
    public summary: string = null;
    public about: string = null;
    public email: string = null;
    public phone: string = null;
    public residence: string = null;
    public birthday: string = null;
    public linkedin: string = null;
    public github: string = null;
    public recommendations: string = null;
    public title: string = null;
    public activated: boolean = null;
    public portfolio: string = null;
    public preferencedArea: string = null;
    public salaryFromPreference: number = null;
    public salaryTillPreference: number = null;

    public positionPreference = new Position(null, null);
    public template = new Template(null, null);
    public cvLang = [];
    public cvSkill = [];
    public education = [];
    public cvJobs = [];
    public cvAchievements = [];
    public cvCertification = [];
    public cvActivity = [];

    constructor(cv?) {
        if (!cv) {
            this.positionPreference = new Position('', '');
            this.template = new Template(0, 0);
            this.cvLang.push(new Language(null, ''));
            this.cvSkill.push(new Skill(null, ''));
            this.education.push(new Education(null, '', null, '', '', ''));
            this.cvJobs.push(new Job(null, '', null, '', '', null, null, 50));
            this.cvAchievements.push(new Achievement('', null));
            this.cvCertification.push(new Certification('', null));
        }
    }
}
