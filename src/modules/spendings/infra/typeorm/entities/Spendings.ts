import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { User } from '../../../../users/infra/typeorm/entities/User';
import { Category } from './Category';

@Entity('spendings')
class Spendings {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  value: number;

  @Column()
  date: Date;

  @Column()
  user_id: string;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  category_id: string;

  @ManyToOne(() => Category, (category) => category.spendings)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export { Spendings };
