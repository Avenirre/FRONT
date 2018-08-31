import {LoginDataInterface} from '../../interfaces/login-data.interface';

export class LoginData implements LoginDataInterface {
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
