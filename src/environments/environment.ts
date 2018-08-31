export const environment = {
  production: false,
  apiUrl: 'http://localhost',
  apiPort: 8080,
  api: {
    login: ['api', 'login'],
    registration: ['api', 'profiles'],
  },
  routes: {
    root: '',
    login: 'login',
    regCandidate: 'registration-candidate',
    regCompany: 'registration-company',
    profile: 'profile',
    cvCreate: 'create-cv',
    unauthorizedUser: 'unauthorized',
  }
};
