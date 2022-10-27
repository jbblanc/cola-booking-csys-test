import { Column } from 'typeorm';

export class Credentials {

  @Column({ name: 'password', length: 100, nullable: false })
  password: string;

  @Column({ name: 'salt', length: 100, nullable: false })
  salt: string;

  
}
