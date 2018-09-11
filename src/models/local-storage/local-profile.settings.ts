export class LocalProfile {
  profile: Object;
  timestamp = Date.now();
  token: number;

  constructor(profile: Object, token) {
    this.profile = profile;
    this.token = token;
  }
}
