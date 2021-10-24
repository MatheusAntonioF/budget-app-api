import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateSpendings1635030900095 implements MigrationInterface {
  private spendingsTable = new Table({
    name: 'spendings',
    columns: [
      {
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()',
      },
      {
        name: 'name',
        type: 'varchar',
      },
      {
        name: 'description',
        type: 'varchar',
      },
      {
        name: 'value',
        type: 'decimal',
      },
      {
        name: 'date',
        type: 'timestamp',
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
    return queryRunner.createTable(this.spendingsTable);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.dropTable(this.spendingsTable);
  }
}
