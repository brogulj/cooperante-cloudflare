import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`pages_blocks_job_board_block_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`link_appearance\` text DEFAULT 'default',
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_job_board_block\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_job_board_block_links_order_idx\` ON \`pages_blocks_job_board_block_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_job_board_block_links_parent_id_idx\` ON \`pages_blocks_job_board_block_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_job_board_block_links_locales\` (
  	\`link_label\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_job_board_block_links\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_job_board_block_links_locales_locale_parent_id_unique\` ON \`pages_blocks_job_board_block_links_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_job_board_block\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_job_board_block_order_idx\` ON \`pages_blocks_job_board_block\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_job_board_block_parent_id_idx\` ON \`pages_blocks_job_board_block\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_job_board_block_path_idx\` ON \`pages_blocks_job_board_block\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_job_board_block_locales\` (
  	\`title\` text NOT NULL,
  	\`subtitle\` text NOT NULL,
  	\`description\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_job_board_block\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_job_board_block_locales_locale_parent_id_unique\` ON \`pages_blocks_job_board_block_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`job_ads\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`slug\` text,
  	\`slug_lock\` integer DEFAULT true,
  	\`employment_type\` text NOT NULL,
  	\`number_of_openings\` numeric NOT NULL,
  	\`translated\` integer DEFAULT false,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`job_ads_slug_idx\` ON \`job_ads\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`job_ads_updated_at_idx\` ON \`job_ads\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`job_ads_created_at_idx\` ON \`job_ads\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`job_ads_locales\` (
  	\`title\` text NOT NULL,
  	\`location\` text NOT NULL,
  	\`industry\` text NOT NULL,
  	\`short_description\` text NOT NULL,
  	\`benefits\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`job_ads\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`job_ads_locales_locale_parent_id_unique\` ON \`job_ads_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`job_ads_id\` integer REFERENCES job_ads(id);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_job_ads_id_idx\` ON \`payload_locked_documents_rels\` (\`job_ads_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`pages_blocks_job_board_block_links\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_job_board_block_links_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_job_board_block\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_job_board_block_locales\`;`)
  await db.run(sql`DROP TABLE \`job_ads\`;`)
  await db.run(sql`DROP TABLE \`job_ads_locales\`;`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_payload_locked_documents_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	\`media_id\` integer,
  	\`pages_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_payload_locked_documents_rels\`("id", "order", "parent_id", "path", "users_id", "media_id", "pages_id") SELECT "id", "order", "parent_id", "path", "users_id", "media_id", "pages_id" FROM \`payload_locked_documents_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new_payload_locked_documents_rels\` RENAME TO \`payload_locked_documents_rels\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_media_id_idx\` ON \`payload_locked_documents_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_pages_id_idx\` ON \`payload_locked_documents_rels\` (\`pages_id\`);`)
}
