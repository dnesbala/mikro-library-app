import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { Author } from "./Author";

@Entity()
export class Book {
  @PrimaryKey()
  id!: number;

  @Property()
  title!: string;

  @Property()
  publishedYear!: number;

  // many books can be written by a single author
  @ManyToOne(() => Author)
  author!: Author;
}
