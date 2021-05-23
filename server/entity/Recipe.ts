import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RecipeIngredient } from './RecipeIngredient';

@Entity()
export class Recipe extends BaseEntity {
  @PrimaryGeneratedColumn()
  public _id: number;

  @Column({ unique: true })
  name!: string;

  @Column({ nullable: true })
  imageUrl!: string;

  @Column({ nullable: true, type: 'text' })
  method!: string;

  @OneToMany(() => RecipeIngredient, (recipeIngredients) => recipeIngredients.recipe)
  public ingredients!: RecipeIngredient[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
