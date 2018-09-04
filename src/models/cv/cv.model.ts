import { Activity } from './cv.activity.model';
import { Certification } from './cv.certification.model';
import { Achievement } from './cv.achievement.model';
import { Job } from './cv.job.model';
import { Education } from './cv.education.model';
import { Skill } from './cv.skill.model';
import { Language } from './cv.lang.model';
import { Template } from './cv.template.model';

export class CV {
    id: number;
    first_name: string;
    second_name: string;
    profile_id: number;
    summary: string;
    about: string;
    email: string;
    phone: string;
    residence: string;
    birthday: string;
    linkedin: string;
    github: string;
    recommendations: string;
    title: string;
    activated: boolean;
    portfolio: string;
    preferencedArea: string;
    salaryFromPreference: number;
    salaryTillPreference: number;

    position_preference: Position;
    template: Template;
    cvLang: [ Language ];
    cvSkill: [ Skill ];
    education: [ Education ];
    cvJobs: [ Job ];
    cvAchievements: [ Achievement ];
    cvCertification: [ Certification ];
    cvActivity: [ Activity ];

    public constructor() {

    }

    public compileActivity() {

    }

    public unCompileActivity() {

    }
}
