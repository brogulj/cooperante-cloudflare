import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_pages_blocks_services_block_locales\` (
  	\`title\` text NOT NULL,
  	\`subtitle\` text,
  	\`content\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_services_block\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_pages_blocks_services_block_locales\`("title", "subtitle", "content", "id", "_locale", "_parent_id") SELECT "title", "subtitle", "content", "id", "_locale", "_parent_id" FROM \`pages_blocks_services_block_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_services_block_locales\`;`)
  await db.run(sql`ALTER TABLE \`__new_pages_blocks_services_block_locales\` RENAME TO \`pages_blocks_services_block_locales\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_services_block_locales_locale_parent_id_unique\` ON \`pages_blocks_services_block_locales\` (\`_locale\`,\`_parent_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_pages_blocks_services_block_locales\` (
  	\`title\` text NOT NULL,
  	\`subtitle\` text NOT NULL,
  	\`content\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_services_block\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_pages_blocks_services_block_locales\`("title", "subtitle", "content", "id", "_locale", "_parent_id") SELECT "title", "subtitle", "content", "id", "_locale", "_parent_id" FROM \`pages_blocks_services_block_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_services_block_locales\`;`)
  await db.run(sql`ALTER TABLE \`__new_pages_blocks_services_block_locales\` RENAME TO \`pages_blocks_services_block_locales\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_services_block_locales_locale_parent_id_unique\` ON \`pages_blocks_services_block_locales\` (\`_locale\`,\`_parent_id\`);`)
}
