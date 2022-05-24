import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'email',
    type: 'varchar',
    length: 50,
    unique: true,
  })
  email: string;

  @Column({
    name: 'first_name',
    type: 'varchar',
    length: 30,
  })
  firstName: string;

  @Column({
    name: 'last_name',
    type: 'varchar',
    length: 30,
  })
  lastName: string;

  @Column({
    name: 'age',
    type: 'int',
  })
  age: number;

  @Column({
    name: 'gender',
    type: 'tinyint',
  })
  gender: number;

  @Column({
    name: 'username',
    type: 'varchar',
    length: 30,
    unique: true,
  })
  username: string;
  password: string;
}
