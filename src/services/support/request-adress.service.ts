import {QueryAdressInterface} from '../../interfaces/query-adress.interface';

export class RequestAdress implements QueryAdressInterface {
  constructor(
    public host: string,
    public port: string,
    public path: string[] = []
  ) {
  }
}
