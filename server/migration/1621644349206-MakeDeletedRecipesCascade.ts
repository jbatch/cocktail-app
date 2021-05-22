import { MigrationInterface, QueryRunner } from 'typeorm';

export class MakeDeletedRecipesCascade1621644349206 implements MigrationInterface {
  name = 'MakeDeletedRecipesCascade1621644349206';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `recipe_ingredient` DROP FOREIGN KEY `FK_256c22ec24d2d590b39e11a3ee4`');
    await queryRunner.query(
      'ALTER TABLE `recipe_ingredient` ADD CONSTRAINT `FK_256c22ec24d2d590b39e11a3ee4` FOREIGN KEY (`recipe_id`) REFERENCES `recipe`(`_id`) ON DELETE CASCADE ON UPDATE NO ACTION'
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `recipe_ingredient` DROP FOREIGN KEY `FK_256c22ec24d2d590b39e11a3ee4`');
    await queryRunner.query(
      'ALTER TABLE `recipe_ingredient` ADD CONSTRAINT `FK_256c22ec24d2d590b39e11a3ee4` FOREIGN KEY (`recipe_id`) REFERENCES `recipe`(`_id`) ON DELETE NO ACTION ON UPDATE NO ACTION'
    );
  }
}
