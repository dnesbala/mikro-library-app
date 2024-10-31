import { Migration } from '@mikro-orm/migrations';

export class Migration20241031154926 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "book" add column "published_year" int not null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "book" drop column "published_year";`);
  }

}
