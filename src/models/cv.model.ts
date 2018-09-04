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
    template: {
        type: number,
        color_scheme: number
    };
    portfolio: string;
    preferencedArea: string;
    position_preference: {
        id: number,
        postName: string
    };
    salaryFromPreference: number;
    salaryTillPreference: number;
    cvLang: [
        {
            id: number,
            name_lang: string
        }
    ];
    cvSkill: [
        {
            id: number,
            name_skill: string
        }
    ];
    education: [
        {
            id: string,
            institution: string,
            year_end: number,
            degree: string,
            location: string,
            note: string
        }
    ];
    cvJobs: [
        {
            id: number,
            company: string,
            position: {
                id: number,
                postName: string
            },
            description: string,
            yearStart: number,
            yearEnd: number,
            backFront: number
        }
    ];
    cvAchievements: [
        {
            description: string,
            yearEnd: number
        }
    ];
    cvCertification: [
        {
            description: string,
            yearEnd: number
        }
    ];
    // cvActivity: [
    //     {
    //         id: number,
    //         activityType: {
    //             id: number; // 1 - project jobs, achivements, certifications
    //             name: string
    //         },
    //         position: {
    //             id: number,
    //             postName: string
    //         },
    //         description: string, // achivements + certification
    //         yearStart: number,
    //         yearEnd: number, // achivements + certification
    //         backFront: number
    //     }
    // ];
}


// import {Experience} from './experience.model';
// import {Job} from './job.model';
// import {Education} from './education.model';
//
// export class CV {
//   public id: null;
//   public personal_info = {
//     first_name: '',
//     second_name: '',
//     residence: '',
//     languages: [''],
//     education: [new Education('', '', '', '', '')],
//     birthday: '',
//     other_link: '',
//     summary: '',
//     about: ''
//   };
//   public contact_info = {
//     address: '',
//     phone: '',
//     email: '',
//     linkedin: ''
//   };
//   public preferences = {
//     description: '',
//     area: '',
//     position: '',
//     salary_from: '',
//     salary_till: ''
//   };
//   public prof_info = {
//     experience: [new Experience('', null)],
//     skills: [''],
//     jobs: [new Job('', '', -1, '', '', '')],
//     achievements: [''],
//     certification: [''],
//     portfolio: '',
//     github: '',
//     recommendations: ''
//   };
//   public settings = {
//     title: 'Title',
//     activated: false,
//     template: {
//       type: 0,
//       colorScheme: 0
//     },
//     candidate_id: null
//   };
//
//   constructor() {}
// }
