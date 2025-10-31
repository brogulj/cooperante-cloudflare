import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`pages_blocks_about_us_block_stats\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`value\` text,
  	\`label\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_about_us_block\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_about_us_block_stats_order_idx\` ON \`pages_blocks_about_us_block_stats\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_about_us_block_stats_parent_id_idx\` ON \`pages_blocks_about_us_block_stats\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_about_us_block_people\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_about_us_block\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_about_us_block_people_order_idx\` ON \`pages_blocks_about_us_block_people\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_about_us_block_people_parent_id_idx\` ON \`pages_blocks_about_us_block_people\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_about_us_block_people_image_idx\` ON \`pages_blocks_about_us_block_people\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_about_us_block_people_locales\` (
  	\`name\` text,
  	\`title\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_about_us_block_people\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_about_us_block_people_locales_locale_parent_id_unique\` ON \`pages_blocks_about_us_block_people_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_about_us_block_values_values_list\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`icon_id\` integer,
  	FOREIGN KEY (\`icon_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_about_us_block\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_about_us_block_values_values_list_order_idx\` ON \`pages_blocks_about_us_block_values_values_list\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_about_us_block_values_values_list_parent_id_idx\` ON \`pages_blocks_about_us_block_values_values_list\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_about_us_block_values_values_list_icon_idx\` ON \`pages_blocks_about_us_block_values_values_list\` (\`icon_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_about_us_block_values_values_list_locales\` (
  	\`title\` text,
  	\`description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_about_us_block_values_values_list\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_about_us_block_values_values_list_locales_locale_parent_id_unique\` ON \`pages_blocks_about_us_block_values_values_list_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_about_us_block_how_we_work_steps\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_about_us_block\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_about_us_block_how_we_work_steps_order_idx\` ON \`pages_blocks_about_us_block_how_we_work_steps\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_about_us_block_how_we_work_steps_parent_id_idx\` ON \`pages_blocks_about_us_block_how_we_work_steps\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_about_us_block_how_we_work_steps_locales\` (
  	\`title\` text,
  	\`description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_about_us_block_how_we_work_steps\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_about_us_block_how_we_work_steps_locales_locale_parent_id_unique\` ON \`pages_blocks_about_us_block_how_we_work_steps_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_about_us_block_partnership_models_models\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_about_us_block\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_about_us_block_partnership_models_models_order_idx\` ON \`pages_blocks_about_us_block_partnership_models_models\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_about_us_block_partnership_models_models_parent_id_idx\` ON \`pages_blocks_about_us_block_partnership_models_models\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_about_us_block_partnership_models_models_locales\` (
  	\`title\` text,
  	\`description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_about_us_block_partnership_models_models\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_about_us_block_partnership_models_models_locales_locale_parent_id_unique\` ON \`pages_blocks_about_us_block_partnership_models_models_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_about_us_block_our_team_members\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_about_us_block\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_about_us_block_our_team_members_order_idx\` ON \`pages_blocks_about_us_block_our_team_members\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_about_us_block_our_team_members_parent_id_idx\` ON \`pages_blocks_about_us_block_our_team_members\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_about_us_block_our_team_members_image_idx\` ON \`pages_blocks_about_us_block_our_team_members\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_about_us_block_our_team_members_locales\` (
  	\`name\` text,
  	\`title\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_about_us_block_our_team_members\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_about_us_block_our_team_members_locales_locale_parent_id_unique\` ON \`pages_blocks_about_us_block_our_team_members_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_about_us_block_certificates\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`certificate_image_id\` integer,
  	FOREIGN KEY (\`certificate_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_about_us_block\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_about_us_block_certificates_order_idx\` ON \`pages_blocks_about_us_block_certificates\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_about_us_block_certificates_parent_id_idx\` ON \`pages_blocks_about_us_block_certificates\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_about_us_block_certificates_certificate_ima_idx\` ON \`pages_blocks_about_us_block_certificates\` (\`certificate_image_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_about_us_block_certificates_locales\` (
  	\`certificate_title\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_about_us_block_certificates\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_about_us_block_certificates_locales_locale_parent_id_unique\` ON \`pages_blocks_about_us_block_certificates_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_about_us_block\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`background_image_id\` integer,
  	\`story\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`background_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_about_us_block_order_idx\` ON \`pages_blocks_about_us_block\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_about_us_block_parent_id_idx\` ON \`pages_blocks_about_us_block\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_about_us_block_path_idx\` ON \`pages_blocks_about_us_block\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_about_us_block_background_image_idx\` ON \`pages_blocks_about_us_block\` (\`background_image_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_about_us_block_locales\` (
  	\`title\` text,
  	\`subtitle\` text,
  	\`first_text\` text,
  	\`values_title\` text,
  	\`mission_and_vision_mission_title\` text,
  	\`mission_and_vision_mission_description\` text,
  	\`mission_and_vision_vision_title\` text,
  	\`mission_and_vision_vision_description\` text,
  	\`how_we_work_title\` text,
  	\`partnership_models_title\` text,
  	\`our_team_title\` text,
  	\`certificates_title\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_about_us_block\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_about_us_block_locales_locale_parent_id_unique\` ON \`pages_blocks_about_us_block_locales\` (\`_locale\`,\`_parent_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`pages_blocks_about_us_block_stats\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_about_us_block_people\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_about_us_block_people_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_about_us_block_values_values_list\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_about_us_block_values_values_list_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_about_us_block_how_we_work_steps\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_about_us_block_how_we_work_steps_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_about_us_block_partnership_models_models\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_about_us_block_partnership_models_models_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_about_us_block_our_team_members\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_about_us_block_our_team_members_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_about_us_block_certificates\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_about_us_block_certificates_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_about_us_block\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_about_us_block_locales\`;`)
}
