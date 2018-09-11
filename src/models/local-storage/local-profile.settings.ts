export class LocalProfile {
  profile: Object;
  timestamp = new Date();
  token: number;

  constructor(profile: Object, token) {
    this.profile = profile;
    this.token = token;
  }
}
