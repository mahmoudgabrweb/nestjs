import { MigrationInterface, QueryRunner } from 'typeorm';

export class CountriesRelations1693503509744 implements MigrationInterface {
  name = 'CountriesRelations1693503509744';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`teams\` ADD \`country_id\` int NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE \`teams\` ADD CONSTRAINT \`FK_f20925d65372bcaa5a75e292754\` FOREIGN KEY (\`country_id\`) REFERENCES \`countries\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`teams\` DROP FOREIGN KEY \`FK_f20925d65372bcaa5a75e292754\``
    );
    await queryRunner.query(`ALTER TABLE \`teams\` DROP COLUMN \`country_id\``);
  }
}
