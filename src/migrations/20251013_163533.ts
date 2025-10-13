import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`pages_blocks_why_choose_us_block_reasons\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_why_choose_us_block\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_why_choose_us_block_reasons_order_idx\` ON \`pages_blocks_why_choose_us_block_reasons\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_why_choose_us_block_reasons_parent_id_idx\` ON \`pages_blocks_why_choose_us_block_reasons\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_why_choose_us_block_reasons_locales\` (
  	\`text\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_why_choose_us_block_reasons\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_why_choose_us_block_reasons_locales_locale_parent_id_unique\` ON \`pages_blocks_why_choose_us_block_reasons_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_why_choose_us_block\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`dark\` integer DEFAULT false,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_why_choose_us_block_order_idx\` ON \`pages_blocks_why_choose_us_block\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_why_choose_us_block_parent_id_idx\` ON \`pages_blocks_why_choose_us_block\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_why_choose_us_block_path_idx\` ON \`pages_blocks_why_choose_us_block\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_why_choose_us_block_locales\` (
  	\`title\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_why_choose_us_block\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_why_choose_us_block_locales_locale_parent_id_unique\` ON \`pages_blocks_why_choose_us_block_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_process_block_steps\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_process_block\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_process_block_steps_order_idx\` ON \`pages_blocks_process_block_steps\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_process_block_steps_parent_id_idx\` ON \`pages_blocks_process_block_steps\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_process_block_steps_locales\` (
  	\`title\` text NOT NULL,
  	\`description\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_process_block_steps\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_process_block_steps_locales_locale_parent_id_unique\` ON \`pages_blocks_process_block_steps_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_process_block\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`dark\` integer DEFAULT false NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_process_block_order_idx\` ON \`pages_blocks_process_block\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_process_block_parent_id_idx\` ON \`pages_blocks_process_block\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_process_block_path_idx\` ON \`pages_blocks_process_block\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_process_block_locales\` (
  	\`title\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_process_block\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_process_block_locales_locale_parent_id_unique\` ON \`pages_blocks_process_block_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_table_block_columns\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_table_block\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_table_block_columns_order_idx\` ON \`pages_blocks_table_block_columns\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_table_block_columns_parent_id_idx\` ON \`pages_blocks_table_block_columns\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_table_block_columns_locales\` (
  	\`label\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_table_block_columns\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_table_block_columns_locales_locale_parent_id_unique\` ON \`pages_blocks_table_block_columns_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_table_block_rows_cells\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_table_block_rows\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_table_block_rows_cells_order_idx\` ON \`pages_blocks_table_block_rows_cells\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_table_block_rows_cells_parent_id_idx\` ON \`pages_blocks_table_block_rows_cells\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_table_block_rows_cells_locales\` (
  	\`value\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_table_block_rows_cells\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_table_block_rows_cells_locales_locale_parent_id_unique\` ON \`pages_blocks_table_block_rows_cells_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_table_block_rows\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`icon\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_table_block\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_table_block_rows_order_idx\` ON \`pages_blocks_table_block_rows\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_table_block_rows_parent_id_idx\` ON \`pages_blocks_table_block_rows\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_table_block\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`dark\` integer DEFAULT false NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_table_block_order_idx\` ON \`pages_blocks_table_block\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_table_block_parent_id_idx\` ON \`pages_blocks_table_block\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_table_block_path_idx\` ON \`pages_blocks_table_block\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_table_block_locales\` (
  	\`title\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_table_block\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_table_block_locales_locale_parent_id_unique\` ON \`pages_blocks_table_block_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_benefits_block_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_benefits_block\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_benefits_block_items_order_idx\` ON \`pages_blocks_benefits_block_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_benefits_block_items_parent_id_idx\` ON \`pages_blocks_benefits_block_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_benefits_block_items_locales\` (
  	\`text\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_benefits_block_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_benefits_block_items_locales_locale_parent_id_unique\` ON \`pages_blocks_benefits_block_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_benefits_block\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`dark\` integer DEFAULT false,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_benefits_block_order_idx\` ON \`pages_blocks_benefits_block\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_benefits_block_parent_id_idx\` ON \`pages_blocks_benefits_block\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_benefits_block_path_idx\` ON \`pages_blocks_benefits_block\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_benefits_block_locales\` (
  	\`title\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_benefits_block\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_benefits_block_locales_locale_parent_id_unique\` ON \`pages_blocks_benefits_block_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_c_t_a_block_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`link_label\` text NOT NULL,
  	\`link_appearance\` text DEFAULT 'default',
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_c_t_a_block\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_c_t_a_block_links_order_idx\` ON \`pages_blocks_c_t_a_block_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_c_t_a_block_links_parent_id_idx\` ON \`pages_blocks_c_t_a_block_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_c_t_a_block_links_locale_idx\` ON \`pages_blocks_c_t_a_block_links\` (\`_locale\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_c_t_a_block\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`dark\` integer DEFAULT false,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_c_t_a_block_order_idx\` ON \`pages_blocks_c_t_a_block\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_c_t_a_block_parent_id_idx\` ON \`pages_blocks_c_t_a_block\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_c_t_a_block_path_idx\` ON \`pages_blocks_c_t_a_block\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_c_t_a_block_locales\` (
  	\`title\` text NOT NULL,
  	\`subtitle\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_c_t_a_block\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_c_t_a_block_locales_locale_parent_id_unique\` ON \`pages_blocks_c_t_a_block_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`ALTER TABLE \`job_ads\` ADD \`status\` text DEFAULT 'inactive';`)
  await db.run(sql`ALTER TABLE \`job_ads_locales\` ADD \`description\` text;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`pages_blocks_why_choose_us_block_reasons\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_why_choose_us_block_reasons_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_why_choose_us_block\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_why_choose_us_block_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_process_block_steps\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_process_block_steps_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_process_block\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_process_block_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_table_block_columns\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_table_block_columns_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_table_block_rows_cells\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_table_block_rows_cells_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_table_block_rows\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_table_block\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_table_block_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_benefits_block_items\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_benefits_block_items_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_benefits_block\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_benefits_block_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_c_t_a_block_links\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_c_t_a_block\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_c_t_a_block_locales\`;`)
  await db.run(sql`ALTER TABLE \`job_ads\` DROP COLUMN \`status\`;`)
  await db.run(sql`ALTER TABLE \`job_ads_locales\` DROP COLUMN \`description\`;`)
}
