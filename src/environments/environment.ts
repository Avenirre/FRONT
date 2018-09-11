export const environment = {
  production: false,
  apiUrl: 'http://localhost',
  apiPort: 8080,
  /**
   * api routes, used to make request to the back-end server;
   */
  api: {
    login: ['api', 'login'],
    save_cv: ['api', 'cv'],
    delete_cv: ['api', 'cv'],
    lang_ref: ['api', 'languages'],
    skills_ref: ['api', 'skills'],
    user_cvs: ['api', 'cv'],
    registration: ['api', 'signup'],
    getFolders: ['api', 'folders'],
    editFolder: (id: number): string[] => {
      return ['api', 'folders', id.toString()];
    },
    getProfile: ['api', 'profiles'],
  },
  /**
   * local frontend routes
   */
  routes: {
    root: '',
    login: 'login',
    regCandidate: 'registration-candidate',
    regCompany: 'registration-company',
    profile: 'profile',
    profileCandidate: 'profile/candidate',
    profileCompany: 'company',
    profileCompanyFolders: 'folders',
    profileCompanySettings: 'settings',
    profileCompanySearch: 'search',
    cvCreate: 'create-cv',
    cvEdit: 'profile/candidate/edit-cv/:id',
    unauthorizedUser: 'unauthorized',
    cvShow: 'cv/:id',
  },
  /**
   * names of variables in local storage;
   */
  local: {
    profile: 'profile',
    cv: 'cv',
    settings: 'settings'
  },
  /**
   * other options;
   */
  settings: {
    templates: {
      types: [0],
      colorSchemes: [0, 1]
    }
  }
};
