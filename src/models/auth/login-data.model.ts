export class LoginData {
  username: string;
  password: string;

  constructor(username: string, password: string) {
    if (username && password) {
      this.username = username;
      this.password = password;
    } else {
      return null;
    }
  }
}
