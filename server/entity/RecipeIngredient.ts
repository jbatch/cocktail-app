import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Ingredient } from './Ingredient';
import { Recipe } from './Recipe';

@Entity()
export class RecipeIngredient extends BaseEntity {
  @PrimaryGeneratedColumn()
  public _id: number;

  @Column()
  public recipe_id!: number;

  @Column()
  public ingredient_id!: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  public amount!: number;

  @Column()
  public unit!: string;

  @ManyToOne(() => Recipe, (recipe: Recipe) => recipe.ingredients, { onDelete: 'CASCADE' })
  public recipe!: Recipe;

  @ManyToOne(() => Ingredient, (ingredient: Ingredient) => ingredient.recipies)
  public ingredient!: Ingredient;
}
