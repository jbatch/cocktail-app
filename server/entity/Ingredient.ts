import {
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { RecipeIngredient } from './RecipeIngredient';

@Entity()
export class Ingredient extends BaseEntity {
  @PrimaryGeneratedColumn()
  public _id: number;

  @Column({ unique: true })
  name!: string;

  @Column({ nullable: true })
  imageUrl!: string;

  @OneToMany(() => RecipeIngredient, (recipeIngredients) => recipeIngredients.ingredient)
  public recipes!: RecipeIngredient[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
