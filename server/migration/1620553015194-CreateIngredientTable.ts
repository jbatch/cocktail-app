import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateIngredientTable1620553015194 implements MigrationInterface {
  name = 'CreateIngredientTable1620553015194';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE `ingredient` (`_id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `imageUrl` varchar(255) NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX `IDX_b6802ac7fbd37aa71d856a95d8` (`name`), PRIMARY KEY (`_id`)) ENGINE=InnoDB'
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP INDEX `IDX_b6802ac7fbd37aa71d856a95d8` ON `ingredient`');
    await queryRunner.query('DROP TABLE `ingredient`');
  }
}
