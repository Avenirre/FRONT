export const environment = {
  production: false,
  apiUrl: 'http://localhost',
  apiPort: 8080,
  /**
   * api routes, used to make request to the back-end server;
   */
  api: {
    login: ['api', 'login'],
    registration: ['api', 'signup'],
    save_cv: ['api', 'cv']

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
    profileCompany: 'profile/company',
    profileCompanyFolders: 'folders',
    profileCompanySettings: 'settings',
    profileCompanySearch: 'search',
    cvCreate: 'create-cv',
    unauthorizedUser: 'unauthorized',
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
