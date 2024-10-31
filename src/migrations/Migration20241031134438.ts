import { Migration } from '@mikro-orm/migrations';

export class Migration20241031134438 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "author" add column "biography" varchar(255) null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "author" drop column "biography";`);
  }

}
