export class LoginData {
  usernameOrEmail: string;
  password: string;

  constructor(username: string, password: string) {
    if (username && password) {
      this.usernameOrEmail = username;
      this.password = password;
    } else {
      return null;
    }
  }
}
