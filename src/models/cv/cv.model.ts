import { Activity } from './cv.activity.model';
import { Certification } from './cv.certification.model';
import { Achievement } from './cv.achievement.model';
import { Job } from './cv.job.model';
import { Education } from './cv.education.model';
import { Skill } from './cv.skill.model';
import { Language } from './cv.lang.model';
import { Template } from './cv.template.model';

export class CV {
    public id: number;
    public first_name: string;
    public second_name: string;
    public profile_id: number;
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

    public position_preference: Position;
    public template: Template;
    public cvLang: [ Language ];
    public cvSkill: [ Skill ];
    public education: [ Education ];
    public cvJobs: [ Job ];
    public cvAchievements: [ Achievement ];
    public cvCertification: [ Certification ];
    public cvActivity: [ Activity ];

    public constructor(cv?) {
        if (!cv) {
            this.id = null;
            this.profile_id = 0;
        }
    }

    public compileActivity() {
        for (let i = 0; i < this.cvJobs.length; i++) {

        }
    }

    public unCompileActivity() {

    }
}
