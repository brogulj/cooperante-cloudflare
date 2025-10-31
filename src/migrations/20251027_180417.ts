import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`pages_blocks_lander_hero_links_locales\` (
  	\`link_label\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_lander_hero_links\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_lander_hero_links_locales_locale_parent_id_unique\` ON \`pages_blocks_lander_hero_links_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_c_t_a_block_links_locales\` (
  	\`link_label\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_c_t_a_block_links\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_c_t_a_block_links_locales_locale_parent_id_unique\` ON \`pages_blocks_c_t_a_block_links_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`DROP INDEX \`pages_blocks_lander_hero_links_locale_idx\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_lander_hero_links\` DROP COLUMN \`_locale\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_lander_hero_links\` DROP COLUMN \`link_label\`;`)
  await db.run(sql`DROP INDEX \`pages_blocks_c_t_a_block_links_locale_idx\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_c_t_a_block_links\` DROP COLUMN \`_locale\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_c_t_a_block_links\` DROP COLUMN \`link_label\`;`)
  await db.run(sql`DROP INDEX \`pages_rels_locale_idx\`;`)
  await db.run(sql`DROP INDEX \`pages_rels_pages_id_idx\`;`)
  await db.run(sql`CREATE INDEX \`pages_rels_pages_id_idx\` ON \`pages_rels\` (\`pages_id\`);`)
  await db.run(sql`ALTER TABLE \`pages_rels\` DROP COLUMN \`locale\`;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`pages_blocks_lander_hero_links_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_c_t_a_block_links_locales\`;`)
  await db.run(sql`DROP INDEX \`pages_rels_pages_id_idx\`;`)
  await db.run(sql`ALTER TABLE \`pages_rels\` ADD \`locale\` text;`)
  await db.run(sql`CREATE INDEX \`pages_rels_locale_idx\` ON \`pages_rels\` (\`locale\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_pages_id_idx\` ON \`pages_rels\` (\`pages_id\`,\`locale\`);`)
  await db.run(sql`ALTER TABLE \`pages_blocks_lander_hero_links\` ADD \`_locale\` text NOT NULL;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_lander_hero_links\` ADD \`link_label\` text NOT NULL;`)
  await db.run(sql`CREATE INDEX \`pages_blocks_lander_hero_links_locale_idx\` ON \`pages_blocks_lander_hero_links\` (\`_locale\`);`)
  await db.run(sql`ALTER TABLE \`pages_blocks_c_t_a_block_links\` ADD \`_locale\` text NOT NULL;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_c_t_a_block_links\` ADD \`link_label\` text NOT NULL;`)
  await db.run(sql`CREATE INDEX \`pages_blocks_c_t_a_block_links_locale_idx\` ON \`pages_blocks_c_t_a_block_links\` (\`_locale\`);`)
}
