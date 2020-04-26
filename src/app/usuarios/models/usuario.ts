import { Contact } from './contact';
import { Address } from './address';

export class Usuario {
  id: number;
  name: string;
  lastname: string;
  login: string;
  password: string;

  address: Address[] = [];
  contact: Contact[] = [];
}

