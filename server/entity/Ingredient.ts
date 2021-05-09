import { Entity, CreateDateColumn, UpdateDateColumn, Column, BaseEntity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Ingredient extends BaseEntity {
  @PrimaryGeneratedColumn()
  public _id: number;

  @Column({ unique: true })
  name!: string;

  @Column({ nullable: true })
  imageUrl!: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
