import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateCategory1635377953949 implements MigrationInterface {
  private categoryTable = new Table({
    name: 'categories',
    columns: [
      {
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        default: 'uuid_generate_v4()',
        generationStrategy: 'uuid',
      },
      {
        name: 'name',
        type: 'varchar',
      },
      {
        name: 'color_hex',
        type: 'varchar',
      },
      {
        name: 'user_id',
        type: 'uuid',
      },
      {
        name: 'created_at',
        type: 'timestamp',
        default: 'now()',
      },
      {
        name: 'updated_at',
        type: 'timestamp',
        default: 'now()',
      },
    ],
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.createTable(this.categoryTable);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.dropTable(this.categoryTable);
  }
}
